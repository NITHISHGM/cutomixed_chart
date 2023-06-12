import { createSlice } from "@reduxjs/toolkit";

const chartViewJsonSlice = createSlice({
  name: "chartViewJson",
  initialState: { jsonData: [] },
  reducers: {
    addJson: (state, action) => {
      state.jsonData.push(action.payload);
    },
  },
});

export const { addJson } = chartViewJsonSlice.actions;
export default chartViewJsonSlice.reducer;
