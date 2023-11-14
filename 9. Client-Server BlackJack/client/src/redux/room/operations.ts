import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../utils/axiosInstance';

export const createRoom = createAsyncThunk(
  '/api/create-room',
  async (_, thunkAPI) => {
    try {
      const response = await instance.post('/api/create-room');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
