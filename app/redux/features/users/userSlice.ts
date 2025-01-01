import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '@/app/types/user';

interface UserState {
  users: User[];
  registrationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  loginStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  activeUser: User | null;
}

const initialState: UserState = {
  users: [],
  registrationStatus: 'idle',
  loginStatus: 'idle',
  error: null,
  activeUser: null,
};

// Register user thunk
export const registerUserThunk = createAsyncThunk(
  'users/register',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://backend-porpop.onrender.com/api/v1/user/register',
        userData
      );
      return response.data; // Assuming the response contains the registered user
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Login user thunk
export const loginUserThunk = createAsyncThunk(
  'users/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://backend-porpop.onrender.com/api/v1/user/login',
        credentials
      );
      return response.data; // Assuming the response contains the logged-in user
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setRegistrationStatus: (state, action: PayloadAction<UserState['registrationStatus']>) => {
      state.registrationStatus = action.payload;
    },
    setLoginStatus: (state, action: PayloadAction<UserState['loginStatus']>) => {
      state.loginStatus = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Registration
    builder.addCase(registerUserThunk.pending, (state) => {
      state.registrationStatus = 'loading';
      state.error = null;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.registrationStatus = 'succeeded';
      state.users.push(action.payload);
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.registrationStatus = 'failed';
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(loginUserThunk.pending, (state) => {
      state.loginStatus = 'loading';
      state.error = null;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.loginStatus = 'succeeded';
      state.activeUser = action.payload;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.loginStatus = 'failed';
      state.error = action.payload as string;
    });
  },
});

export const { addUser, setRegistrationStatus, setLoginStatus, setError } = userSlice.actions;
export default userSlice.reducer;
