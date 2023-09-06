import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  deleteProduct,
  editProduct,
  createProduct,
} from "../../api";
import { IProduct } from "../../models";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [] as IProduct[],
    selectedId: null as null | number,
    searchQuery: "" as string,
    status: null as null | string,
    error: null as null | string,
  },
  reducers: {
    setSelected: (state, action) => {
      state.selectedId = action.payload;
    },
    removeProduct: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
    changeProduct: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      state.items[index] = payload;
    },
    addProduct: (state, { payload }) => {
      state.items = [payload, ...state.items];
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending as any]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [fetchProducts.fulfilled as any]: (state, action) => {
      state.status = "resolved";
      state.items = action.payload;
    },
    [fetchProducts.rejected as any]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [deleteProduct.pending as any]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [deleteProduct.fulfilled as any]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [deleteProduct.rejected as any]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [editProduct.pending as any]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [editProduct.fulfilled as any]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [editProduct.rejected as any]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [createProduct.pending as any]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [createProduct.fulfilled as any]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [createProduct.rejected as any]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const {
  setSelected,
  removeProduct,
  changeProduct,
  addProduct,
  setSearchQuery,
} = productSlice.actions;

export default productSlice.reducer;
