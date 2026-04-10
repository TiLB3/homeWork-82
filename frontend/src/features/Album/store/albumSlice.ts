import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IAlbum, IAlbumWithoutID} from "../../../types";
import {axiosApi} from "../../../axiosApi.ts";
import type {RootState} from "../../../app/store.ts";

interface AlbumSliceState {
  albums: IAlbum[];
  album: IAlbum | null;
  loading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: AlbumSliceState = {
  albums: [],
  album: null,
  loading: false,
  createLoading: false,
  deleteLoading: false,
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

    builder.addCase(fetchAlbum.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.loading = false;
      state.album = action.payload;
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createAlbum.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deleteAlbum.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteAlbum.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteAlbum.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const fetchAlbums = createAsyncThunk<IAlbum[], string | void>("albums/fetchAlbums",
  async (artistId) => {
    const response = await axiosApi<IAlbum[]>(artistId ? `/albums?artist=${artistId}` : "/albums");

    return response.data;
  });

export const fetchAlbum = createAsyncThunk<IAlbum, string>("albums/fetchAlbum",
  async (albumId) => {
    const response = await axiosApi<IAlbum>(`/albums/${albumId}`);

    return response.data;
  });


export const createAlbum = createAsyncThunk<void, IAlbumWithoutID>(
  "albums/createAlbum",
  async (albumMutation) => {
    const formData = new FormData();
    const keys = Object.keys(albumMutation) as (keyof IAlbumWithoutID)[];

    keys.forEach((key) => {
      const value = albumMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    })

    await axiosApi.post("/albums", formData);
  }
)

export const deleteAlbum = createAsyncThunk<void, string>(
  "albums/deleteAlbum",
  async (albumId) => {
    await axiosApi.delete(`albums/${albumId}`);
  }
)

export const listOfAlbums = (state: RootState) => state.album.albums;
export const getAlbum = (state: RootState) => state.album.album;
export const getLoading = (state: RootState) => state.album.loading;
export const getCreateAlbumLoading = (state: RootState) => state.album.createLoading;
export const getDeleteAlbumLoading = (state: RootState) => state.album.deleteLoading;

export const albumReducer = artistSlice.reducer;