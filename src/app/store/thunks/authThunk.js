import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import{ jwtDecode }from "jwt-decode";
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/login/user", {
        email,
        password,
      });
    if(response.data.success){
      const token = response.data.token;
      const userData = jwtDecode(token); // Decode token

      return { token, user: userData };
    }
     
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
