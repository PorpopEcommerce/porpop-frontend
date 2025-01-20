import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@/app/types/product";

interface ProductState {
  allProducts: Product[];
  vendorProducts: Product[];
  filteredProducts: Product[]; //
  status: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  priceRange?: { min: number; max: number }; // Price filter range
}

const initialState: ProductState = {
  allProducts: [],
  vendorProducts: [],
  filteredProducts: [],
  status: "idle",
  deleteStatus: "idle",
  error: null,
  priceRange: { min: 0, max: 0 }, // Default price range
};

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk<Product[], void>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://backend-porpop.onrender.com/api/v1/products"
      );
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all products"
      );
    }
  }
);

// Async thunk to fetch products by vendor ID
export const fetchProductsByVendorId = createAsyncThunk<Product[], string>(
  "products/fetchByVendorId",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://backend-porpop.onrender.com/api/v1/products/vendor/`,
        {
          params: { vendor_id: vendorId },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products by vendor ID"
      );
    }
  }
);

export const deleteProductByVendor = createAsyncThunk<
  string, // This is the returned payload (product ID)
  string, // This is the input (product ID)
  { rejectValue: string }
>("products/deleteByVendor", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `https://backend-porpop.onrender.com/api/v1/product?product_id=${productId}`
    );
    if (response.status === 200) {
      return productId; // Return the deleted product's ID
    } else {
      return rejectWithValue("Failed to delete the product.");
    }
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete the product."
    );
  }
});

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetVendorProducts: (state) => {
      state.vendorProducts = [];
      state.status = "idle";
      state.error = null;
    },
    filterByPrice: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      const { min, max } = action.payload;
      state.filteredProducts = state.allProducts.filter(
        (product) => product.RegularPrice >= min && product.RegularPrice <= max
      );
      state.priceRange = { min, max }; // Update the price range
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.allProducts = action.payload;
        }
      )
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Fetch products by vendor ID
      .addCase(fetchProductsByVendorId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductsByVendorId.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.vendorProducts = action.payload;
        }
      )
      .addCase(fetchProductsByVendorId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteProductByVendor.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(
        deleteProductByVendor.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.deleteStatus = "succeeded";
          state.vendorProducts = state.vendorProducts.filter(
            (product) => product.ProductID !== action.payload
          );
          state.allProducts = state.allProducts.filter(
            (product) => product.ProductID !== action.payload
          );
          state.filteredProducts = state.filteredProducts.filter(
            (product) => product.ProductID !== action.payload
          );
        }
      )
      .addCase(deleteProductByVendor.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetVendorProducts, filterByPrice } = productSlice.actions;
export default productSlice.reducer;
