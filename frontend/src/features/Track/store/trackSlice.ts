import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ITrack} from "../../../types";
import {axiosApi} from "../../../axiosApi.ts";
import type { RootState } from "../../../app/store.ts";

interface TrackSliceState {
  tracks: ITrack[];
  loading: boolean;
}

const initialState: TrackSliceState = {
  tracks: [],
  loading: false,
}

const TrackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.loading = false;
      state.tracks = action.payload;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const fetchTracks = createAsyncThunk<ITrack[], string | void>("track/fetchTracks",
  async (albumId) => {
    const response = await axiosApi<ITrack[]>(albumId ? `/tracks?album=${albumId}` :"/tracks");

    return response.data;
  });

export const listOfTracks = (state: RootState) => state.track.tracks;
export const getLoading = (state: RootState) => state.track.loading;
export const trackReducer = TrackSlice.reducer;