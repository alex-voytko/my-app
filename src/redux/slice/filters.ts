import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    priceRange: [0, 0] as [number, number],
    selectedCategories: [] as string[],
  },
  reducers: {
    setFilters: (
      state,
      {
        payload,
      }: PayloadAction<{
        priceRange: [number, number];
        selectedCategories: string[];
      }>
    ) => {
      state.priceRange = payload.priceRange;
      state.selectedCategories = payload.selectedCategories;
    },
  },
});

export const { setFilters } = filterSlice.actions;

export default filterSlice.reducer;
