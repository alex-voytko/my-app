import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProduct,
  changeProduct,
  removeProduct,
  setSelected,
} from "../redux/slice/products";
import { IMyProductStates, IProduct } from "../models";

axios.defaults.baseURL = "https://dummyjson.com";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get("/products");
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.delete("/products/" + id);
      console.log("DELETE_RESPONSE: ", response);
      dispatch(setSelected(null));
      dispatch(removeProduct(id));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async function (newData: IProduct, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.put("/products/" + newData.id);
      console.log("EDIT_RESPONSE: ", response);
      if (response.status < 300) {
        dispatch(changeProduct(newData));
        dispatch(setSelected(null));
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/add",
  async function (newData: IMyProductStates, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.post("/products/add");
      console.log("ADD_RESPONSE: ", response);
      if (response.status < 300) {
        dispatch(addProduct(newData));
        dispatch(setSelected(null));
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
