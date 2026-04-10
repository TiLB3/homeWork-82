import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ITrack, ITrackWithoutID} from "../../../types";
import {axiosApi} from "../../../axiosApi.ts";
import type {RootState} from "../../../app/store.ts";

interface TrackSliceState {
  tracks: ITrack[];
  loading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: TrackSliceState = {
  tracks: [],
  loading: false,
  createLoading: false,
  deleteLoading: false,
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

    builder.addCase(createTrack.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createTrack.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTrack.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deleteTrack.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteTrack.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteTrack.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(publicateTrack.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(publicateTrack.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(publicateTrack.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const fetchTracks = createAsyncThunk<ITrack[], string | void>("track/fetchTracks",
  async (albumId) => {
    const response = await axiosApi<ITrack[]>(albumId ? `/tracks?album=${albumId}` : "/tracks");

    return response.data;
  });


export const createTrack = createAsyncThunk<void, ITrackWithoutID>(
  "track/createTrack",
  async (trackMutation) => {
    await axiosApi.post("/tracks", trackMutation);
  }
)

export const deleteTrack = createAsyncThunk<void, string>(
  "track/deleteTrack",
  async (trackId) => {
    await axiosApi.delete(`tracks/${trackId}`);
  }
)

export const publicateTrack = createAsyncThunk<void, string>(
  "track/publicateTrack",
  async (trackId) => {
    await axiosApi.patch(`tracks/${trackId}/togglePublished`);
  }
)


export const listOfTracks = (state: RootState) => state.track.tracks;
export const getLoading = (state: RootState) => state.track.loading;
export const getCreateTrackLoading = (state: RootState) => state.track.createLoading;
export const getDeleteTrackLoading = (state: RootState) => state.track.deleteLoading;
export const trackReducer = TrackSlice.reducer;