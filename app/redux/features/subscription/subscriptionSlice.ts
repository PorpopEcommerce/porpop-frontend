import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

// 1. Fetch all billing plans
export const fetchPlans = createAsyncThunk('subscription/fetchPlans', async () => {
  const response = await axios.get(`${BASE_URL}/v1/billing/plans/list`);
  return response.data.body.plans;
});

// 2. Fetch subscriptions for a user
export const fetchUserSubscriptions = createAsyncThunk(
  'subscription/fetchUserSubscriptions',
  async (userId: string, { rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue('User ID is required');
    }
    
    const token = Cookies.get('access_token');


    const response = await axios.get(
      `${BASE_URL}/v1/billing/subscriptions?user_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.body;
  }
);


interface SubscriptionState {
  plans: any[];
  subscriptions: {
    has_subscription: boolean | null;
    // Other subscription-related properties can go here, e.g., subscription type, status, etc.
  };
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  plans: [],
  subscriptions: {
    has_subscription: null, // Default to false if not subscribed
  },
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Plans
    builder.addCase(fetchPlans.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPlans.fulfilled, (state, action) => {
      state.loading = false;
      state.plans = action.payload;
    });
    builder.addCase(fetchPlans.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch plans';
    });

    // Subscriptions
    builder.addCase(fetchUserSubscriptions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserSubscriptions.fulfilled, (state, action) => {
      state.loading = false;
      // Assuming action.payload is an object with 'has_subscription'
      state.subscriptions = {
        ...action.payload, // Merge other subscription details if needed
        has_subscription: action.payload.has_subscription, 
      };
    });
    builder.addCase(fetchUserSubscriptions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to fetch subscriptions';
    });
  },
});

export default subscriptionSlice.reducer;
