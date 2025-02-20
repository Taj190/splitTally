import { createSlice } from "@reduxjs/toolkit";
import { fetchGroups } from "../thunks/groupListThunk";

const initialState={
    groups: [],
    loading: false,
    error : null,
    totalPages: 0,
}

const GroupSlice = createSlice({
    name : 'groups',
     initialState,
    reducers: {
        selectGroup: (state, action) => {
            state.selectedGroup = action.payload;
        },
    },
    extraReducers:(builder)=>{
    builder
    .addCase( fetchGroups.pending , (state)=>{
        state.loading = true ;
        state.error = null;

    })
    .addCase(fetchGroups.fulfilled , (state , action)=>{
        state.loading = false; 
        state.groups = action.payload.groups;
        state.totalPages = action.payload.totalPages; 
    })

    .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
   
    });
}})
export default GroupSlice.reducer;
