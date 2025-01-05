import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@/app/types/product";

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch products
export const fetchAllProducts = createAsyncThunk<Product[], void>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://backend-porpop.onrender.com/api/v1/products"
      );
      return response.data.products; // Assuming "products" is the key containing the array
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);


export const fetchProductByVendorId = createAsyncThunk<Product[], string>(
  "products/fetchByVendorId",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://backend-porpop.onrender.com/api/v1/products?vendorId=${vendorId}`,
        {
          params: { vendor_id: vendorId },
          
        },
      );
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products by vendor"
      );
    }
  }
);


export const deleteProductByVendorId = createAsyncThunk<Product[], string>(
  "products/fetchByVendorId",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://backend-porpop.onrender.com/api/v1/product?product_id=${productId}`,
        {
          params: { ProductId: productId },
          
        },
      );
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products by vendor"
      );
    }
  }
);



const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProductsState: (state) => {
      state.products = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
        }
      )
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchProductByVendorId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductByVendorId.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
        }
      )
      .addCase(fetchProductByVendorId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
  
});

export const { resetProductsState } = productSlice.actions;
export default productSlice.reducer;
