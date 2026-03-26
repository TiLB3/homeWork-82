import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IArtist} from "../../../types";
import {axiosApi} from "../../../axiosApi.ts";
import type { RootState } from "../../../app/store.ts";

interface ArtistSliceState {
  artists: IArtist[];
  loading: boolean;
}

const initialState: ArtistSliceState = {
  artists: [],
  loading: false,
}

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.loading = false;
      state.artists = action.payload;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const fetchArtists = createAsyncThunk<IArtist[]>("artists/fetchArtists",
  async () => {
    const response = await axiosApi<IArtist[]>("/artists");

    return response.data;
  });

export const listOfArtists = (state: RootState) => state.artist.artists;
export const artistReducer = artistSlice.reducer;