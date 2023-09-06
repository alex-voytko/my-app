import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "../../models";

const sortSlice = createSlice({
  name: "sorts",
  initialState: {
    sorts: "none" as "none" | Sort,
  },
  reducers: {
    setSorts: (state, { payload }: PayloadAction<Sort | "none">) => {
      state.sorts = payload;
    },
  },
});

export const { setSorts } = sortSlice.actions;

export default sortSlice.reducer;
