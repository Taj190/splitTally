import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGroups = createAsyncThunk(
    'groups/fetchGroups',
    async ({ page, token }, { rejectWithValue }) => {
        try {
            const headers = token
            ? { Authorization: `Bearer ${token}` }
            : { credentials: "include" };
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/group/list?page=${page}`,
            { headers, withCredentials: true }
          );
         
          return response.data; // Return the fetched group data
        } catch (error) {
            console.log(error)
          return rejectWithValue(error.response?.data || 'Failed to fetch groups');
        }
      }
)