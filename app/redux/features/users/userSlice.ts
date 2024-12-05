import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/app/types/user";


interface UserState {
  users: User[]; // Array of users
  currentUser: User | null; // Current logged-in user
  registrationStatus: "idle" | "loading" | "succeeded" | "failed";
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  registrationStatus: "idle",
  loginStatus: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setRegistrationStatus: (state, action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">) => {
      state.registrationStatus = action.payload;
    },
    setLoginStatus: (state, action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">) => {
      state.loginStatus = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { addUser, setRegistrationStatus, setLoginStatus, setError, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;