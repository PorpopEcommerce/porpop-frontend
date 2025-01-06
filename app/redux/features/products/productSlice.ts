import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@/app/types/product";

interface ProductState {
  allProducts: Product[];
  vendorProducts: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  allProducts: [],
  vendorProducts: [],
  status: "idle",
  error: null,
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
        `https://backend-porpop.onrender.com/api/v1/products/vendor/?vendor_id=${vendorId}`,
      );
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products by vendor ID"
      );
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Fetch products by vendor ID
      .addCase(fetchProductsByVendorId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByVendorId.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.vendorProducts = action.payload;
      })
      .addCase(fetchProductsByVendorId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetVendorProducts } = productSlice.actions;
export default productSlice.reducer;