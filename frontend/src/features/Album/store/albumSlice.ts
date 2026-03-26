import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IAlbum} from "../../../types";
import {axiosApi} from "../../../axiosApi.ts";
import type {RootState} from "../../../app/store.ts";

interface AlbumSliceState {
  albums: IAlbum[];
  loading: boolean;
}

const initialState: AlbumSliceState = {
  albums: [],
  loading: false,
}

const artistSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.loading = false;
      state.albums = action.payload;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const fetchAlbums = createAsyncThunk<IAlbum[], string | void>("albums/fetchAlbums",
  async (artistId) => {
    const response = await axiosApi<IAlbum[]>(artistId ? `/albums?artist=${artistId}` :"/albums");

    return response.data;
  });

export const listOfAlbums = (state: RootState) => state.artist.artists;
export const albumReducer = artistSlice.reducer;