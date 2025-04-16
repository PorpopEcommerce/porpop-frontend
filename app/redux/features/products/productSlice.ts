import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface ProductState {
  allProducts: any[];
  vendorProducts: any[];
  filteredProducts: any[]; //
  status: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  priceRange?: { min: number }; // Price filter range
}

const initialState: ProductState = {
  allProducts: [],
  vendorProducts: [],
  filteredProducts: [],
  status: "idle",
  deleteStatus: "idle",
  error: null,
  priceRange: { min: 0 }, // Default price range
};

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk<any[], void>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/v1/product/view`
      );
      return response.data.body.products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all products"
      );
    }
  }
);

// Async thunk to fetch products by vendor ID
export const fetchProductsByVendorId = createAsyncThunk<any[], string>(
  "products/fetchByVendorId",
  async (vendorId, { rejectWithValue }) => {

    const token = Cookies.get('access_token')

    try {
      const response = await axios.get(
        `${BASE_URL}/v1/products/vendor/${vendorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );
      return response.data.body;
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

  const token = Cookies.get('access_token')

  try {
    const response = await axios.delete(
      `${BASE_URL}/v1/products/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
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
export const editProductByVendor = createAsyncThunk<
  any, // You can replace 'any' with a proper Product type if available
  { productId: string; updatedData: any }, // Payload is an object
  { rejectValue: string }
>("products/editByVendor", async (productId, { rejectWithValue }) => {

  const token = Cookies.get('access_token')

  try {
    const response = await axios.patch(
      `${BASE_URL}/v1/products/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    );
    if (response.status === 200) {
      return productId; // Return the edited product's ID
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
      const { min } = action.payload;
      state.filteredProducts = state.allProducts.filter(
        (product) => product.Price <= min
      );
      state.priceRange = { min }; // Update the price range
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
        (state, action: PayloadAction<any[]>) => {
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
        (state, action: PayloadAction<any[]>) => {
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
