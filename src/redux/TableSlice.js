import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { ROOT_URL } from "../App";
export const getTableData = createAsyncThunk(
  "/gets/getTableData",
  async (TableName) => {
    return Axios.get(
      `${ROOT_URL}GetTableColumnsPB?TableName=${TableName}`
    ).then((res) => {
      return res.data;
    });
  }
);
const TableDataSlice = createSlice({
  name: "powerBiTable",
  initialState: { tableData: [], dataStatus: false },
  extraReducers: {
    [getTableData.pending]: (state, action) => {
      state.dataStatus = true;
      state.tableData = [];
    },
    [getTableData.fulfilled]: (state, action) => {
      state.dataStatus = false;
      state.tableData = JSON.parse(action.payload);
    },
    [getTableData.rejected]: (state, action) => {
      state.dataStatus = false;
      state.tableData = [];
    },
  },
});
export default TableDataSlice.reducer;
