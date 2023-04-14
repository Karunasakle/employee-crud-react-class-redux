import { combineReducers } from "@reduxjs/toolkit";
import EmployeeSlice from './EmployeeSlice'

const RootReducer = combineReducers({
    user: EmployeeSlice,
})
export default RootReducer;