import { createSlice } from "@reduxjs/toolkit";

const chartViewJsonSlice = createSlice({
  name: "chartViewJson",
  initialState: { jsonData: [] },
  reducers: {
    addJson: (state, action) => {
      state.jsonData.push(action.payload);
    },
    replaceJson: (state, action) => {
      state.jsonData = action.payload;
    },
  },
});

export const { addJson, replaceJson } = chartViewJsonSlice.actions;
export default chartViewJsonSlice.reducer;
