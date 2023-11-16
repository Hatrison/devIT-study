import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { TState } from './room.types';

export const createRoom = createAsyncThunk(
  '/api/create-room',
  async (_, thunkAPI) => {
    try {
      const response = await instance.post('/api/create-room');
      return response.data;
    } catch (error: any) {
      const { message } = error.response.data;
      toast(message || error.response.data.error, { type: 'error' });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const joinRoom = createAsyncThunk(
  '/api/join-room',
  async (options: Object, thunkAPI) => {
    try {
      const response = await instance.post('/api/join-room', options);
      return response.data;
    } catch (error: any) {
      const { message } = error.response.data;
      toast(message || error.response.data.error, { type: 'error' });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const exitRoom = createAsyncThunk(
  '/api/exit-room',
  async (options: Object, thunkAPI) => {
    try {
      const response = await instance.post('/api/exit-room', options);
      return response.data;
    } catch (error: any) {
      const { message } = error.response.data;
      toast(message || error.response.data.error, { type: 'error' });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const makeAction = createAsyncThunk(
  '/api/log',
  async (actionName: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { room: TState };
      const { roomToken, userToken } = state.room;
      const response = await instance.post('/api/log', {
        action: actionName,
        roomToken,
        userToken,
      });
      return response.data;
    } catch (error: any) {
      const { message } = error.response.data;
      toast(message || error.response.data.error, { type: 'error' });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
