import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    employees : [],
    editEmp:[],
    error : null,
    status : "",
    message:""
}

export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async ()=>{
        const response = await axios.get('http://localhost:3003/employees')
        return response.data
        
    }
)

export const addEmployee = createAsyncThunk(
    'employees/addEmployee',
    async (values)=>{
        const response = await axios.post('http://localhost:3003/employees',values)
        return response.data
        
    }
)
export const deleteEmployee = createAsyncThunk(
    'employees/deleteEmployee',
    async (id)=>{
        const response = await axios.delete(`http://localhost:3003/employees/${id}`)
        return response.data
        
    }
)

export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (values)=>{
        const response = await axios.put(`http://localhost:3003/employees/${values.id}`,values)
        return response.data
    }
)

const employeeSlice = createSlice({
    name : "employees",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchEmployees.pending , (state)=>{
            state.status = "loading"
            
        })
        .addCase(fetchEmployees.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.employees = action.payload
        })
        .addCase(fetchEmployees.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(addEmployee.pending , (state)=>{
            state.status = "loading"
        })
        .addCase(addEmployee.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.employees.push(action.payload);
            state.message = "User has been created successfully.";
        })
        .addCase(addEmployee.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(deleteEmployee.pending , (state)=>{
            state.status = "loading"
        })
        .addCase(deleteEmployee.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.employees.splice(action.payload, 1);
            state.message = "User has been deleted successfully.";
        })
        .addCase(deleteEmployee.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(updateEmployee.pending, (state)=>{
            state.status = "loading"
        })
        .addCase(updateEmployee.fulfilled, (state, action)=>{
            state.status = "succeeded"
            const updatedEmployee = action.payload;
            const index = state.employees?.findIndex((employee) => employee?.id === updatedEmployee?.id);
            state.employees[index] = updatedEmployee;
            state.message = "User has been Edited successfully.";
        })
        .addCase(updateEmployee.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
        })

    }
})

export default employeeSlice.reducer;