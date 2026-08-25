import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    employee: null,
    loading: true,
    error: null,
  },
  reducers: {
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLogout: (state, action) => {
      state.employee = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setEmployee, setLoading, setError, setLogout } = authSlice.actions;
export default authSlice.reducer;
