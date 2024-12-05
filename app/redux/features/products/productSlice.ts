import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
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
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { state: RootState; userId: string }
>("products/fetchProducts", async (_, { getState }) => {
  const state = getState() as RootState;
  const userId = state.user.currentUser?.id;

  if (!userId) {
    throw new Error("Vendor ID not found");
  }

  const response = await axios.get(`http://localhost:3001/users/${userId}`);
  return response.data.vendorData?.products;
});

export const deleteProduct = createAsyncThunk<
  void,
  { state: RootState }
>("products/deleteProduct", async (productId, { getState }) => {
  const state = getState() as RootState;
  const userId = state.user.currentUser?.id;

  if (!userId) {
    throw new Error("vendor Id not found");
  }

  const response = await axios.delete(`http://localhost:3001/users/${userId}/products/${productId}`)
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction) => {
          state.products = state.products.filter(
            (product: any) => product.id !== action.payload
          );
        }
      );
  },
});

export default productSlice.reducer;
