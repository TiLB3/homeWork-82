import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ITrackHistory} from "../../../types";
import {axiosApi} from "../../../axiosApi.ts";
import type {RootState} from "../../../app/store.ts";

interface TrackHistoriesSliceState {
  tracksHistories: ITrackHistory[];
  loading: boolean;
}

const initialState: TrackHistoriesSliceState = {
  tracksHistories: [],
  loading: false,
}

const TrackHistoriesSlice = createSlice({
  name: "trackhistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrackHistories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTrackHistories.fulfilled, (state, {payload: trackHistories}) => {
      state.loading = false;
      state.tracksHistories = trackHistories;
    });
    builder.addCase(fetchTrackHistories.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createTrackHistories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTrackHistories.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createTrackHistories.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const fetchTrackHistories = createAsyncThunk<ITrackHistory[], string>("trackhistory/fetchTrackHistories",
  async (token) => {
    const response = await axiosApi<ITrackHistory[]>("/track_history", {
      headers: {
        'Authorization': token
      }
    });

    return response.data;
  });

export const createTrackHistories = createAsyncThunk<void, {
  token: string,
  track_id: string
}>("trackhistory/createTrackHistories",
  async (trackHistory) => {
    await axiosApi.post("/track_history", trackHistory, {
      headers: {
        'Authorization': trackHistory.token
      }
    });
  });


export const getListOfTrackHistories = (state: RootState) => state.trackhistory.tracksHistories;
export const getLoading = (state: RootState) => state.trackhistory.loading;
export const trackhistoryReducer = TrackHistoriesSlice.reducer;