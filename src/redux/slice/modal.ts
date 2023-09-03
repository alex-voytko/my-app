import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { modalType } from "../../models";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: "" as modalType,
  },
  reducers: {
    setModal: (state, { payload }: PayloadAction<modalType>) => {
      state.isOpen = payload;
    },
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
