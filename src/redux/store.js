import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tableDataReducer from "./TableSlice";
import ChartViewJsonSlice from "./ChartViewJsonSlice";

// Combine the reducers
const rootReducer = combineReducers({
  tableData: tableDataReducer,
  UpdateViewJson: ChartViewJsonSlice,
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
