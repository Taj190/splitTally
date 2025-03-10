import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/user`, {
        email,
        password,
      },{ withCredentials: true } );
     
    if(response.data.success){
     
      const userData = response.data.name
      return { user: { name: userData } };

    }
     
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
