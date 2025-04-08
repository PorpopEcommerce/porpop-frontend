import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "@/app/types/user";
import Cookies from "js-cookie"; // Import js-cookie

interface UserState {
  users: UserData[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  activeUser: any | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

const initialState: UserState = {
  users: [],
  fetchStatus: "idle",
  error: null,
  activeUser: null,
};

export const fetchUserThunk = createAsyncThunk(
  "user/fetchDetails",
  async () => {
    try {
      const token = Cookies.get("access_token"); // Get token from Cookies

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(`${BASE_URL}/v1/auth`, { headers });

      console.log("API Response:", response.data.body);
      return JSON.parse(JSON.stringify(response.data.body));
    } catch (error: any) {
      console.error("Fetch User Error:", error.response?.data || error.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "user/updateUserDetails",
  async (updatedUser: UserData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("access_token");

      const response = await axios.put(`${BASE_URL}/v1/auth`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data.body; // Return updated user data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update user.");
    }
  }
);

export const deleteUserThunk = createAsyncThunk("user/deleteUser", async (_, {rejectWithValue}) => {
  try {
    const token = Cookies.get("access_token");

    const response = await axios.delete(`${BASE_URL}/v1/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    Cookies.remove("access_token"); // Clear auth token after deletion

    return response.data.body; // Return updated user data
  } catch (error: any) {
    console.error(error.response?.data || "Failed to update user.");
    return rejectWithValue(error.response?.data || "Failed to update user.");

  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch user details
    builder.addCase(fetchUserThunk.pending, (state) => {
      state.fetchStatus = "loading";
      state.error = null;
    });
    builder.addCase(
      fetchUserThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.fetchStatus = "succeeded";
        state.activeUser = action.payload;
      }
    );
    builder.addCase(fetchUserThunk.rejected, (state, action) => {
      state.fetchStatus = "failed";
      state.error = action.payload as string;
    });

    // Handle update user
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.fetchStatus = "succeeded";
          state.activeUser = action.payload; // Update user in the Redux state
        }
      )
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload as string;
      });

    // Handle delete user
    builder
      .addCase(deleteUserThunk.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.fetchStatus = "succeeded";
        state.activeUser = null; // Clear active user after deletion
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setError } = userSlice.actions;
export default userSlice.reducer;
