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
export const fetchProducts = createAsyncThunk<Product[], void, { state: RootState }>(
  "products/fetchProducts",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const userId = state.user.currentUser?.id;

    if (!userId) throw new Error("Vendor ID not found");

    const response = await axios.get(`http://localhost:3001/users/${userId}`);
    return response.data.vendor_product?.products || [];
  }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk<string, string, { state: RootState }>(
  "products/deleteProduct",
  async (productId, { getState }) => {
    const state = getState() as RootState;
    const userId = state.user.currentUser?.id;

    if (!userId) throw new Error("User ID not found");

    // Fetch the current user data
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    const user = userResponse.data;

    // Filter out the product to delete
    const updatedProducts = user.vendorData.products.filter(
      (product: Product) => product.id !== productId
    );

    // Update the user data
    const updatedUser = {
      ...user,
      vendorData: {
        ...user.vendorData,
        products: updatedProducts,
      },
    };

    // Save updated user data
    await axios.put(`http://localhost:3001/users/${userId}`, updatedUser);

    return productId; // Return the deleted product ID
  }
);

export const editProduct = createAsyncThunk<Product, { productId: string; updatedData: Partial<Product> }, { state: RootState }>(
  "products/editProduct",
  async ({ productId, updatedData }, { getState }) => {
    const state = getState() as RootState;
    const userId = state.user.currentUser?.id;

    if (!userId) throw new Error("User ID not found");

    // Fetch the current user data
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    const user = userResponse.data;

    // Update the specific product
    const updatedProducts = user.vendorData.products.map((product: Product) =>
      product.id === productId ? { ...product, ...updatedData } : product
    );

    // Update the user data with the modified product
    const updatedUser = {
      ...user,
      vendorData: {
        ...user.vendorData,
        products: updatedProducts,
      },
    };

    // Save updated user data
    await axios.put(`http://localhost:3001/users/${userId}`, updatedUser);

    // Return the updated product
    return updatedProducts.find((product: any) => product.id === productId)!;
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
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update the product in the state
        }
      });
  },
});

export const { resetProductsState } = productSlice.actions;
export default productSlice.reducer;
