import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IArtist, IArtistWithoutID} from "../../../types";
import {axiosApi} from "../../../axiosApi.ts";
import type {RootState} from "../../../app/store.ts";

interface ArtistSliceState {
  artists: IArtist[];
  fetchArtistLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: ArtistSliceState = {
  artists: [],
  fetchArtistLoading: false,
  createLoading: false,
  deleteLoading: false,
}

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchArtistLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.fetchArtistLoading = false;
      state.artists = action.payload;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchArtistLoading = false;
    });

    builder.addCase(createArtist.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createArtist.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createArtist.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deleteArtist.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteArtist.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteArtist.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(publicateArtist.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(publicateArtist.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(publicateArtist.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const fetchArtists = createAsyncThunk<IArtist[]>("artists/fetchArtists",
  async () => {
    const response = await axiosApi<IArtist[]>("/artists");

    return response.data;
  });

export const createArtist = createAsyncThunk<void, IArtistWithoutID>(
  "artists/createArtist",
  async (artistMutation) => {
    const formData = new FormData();
    const keys = Object.keys(artistMutation) as (keyof IArtistWithoutID)[];

    keys.forEach((key) => {
      const value = artistMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    })

    await axiosApi.post("/artists", formData);
  }
)

export const deleteArtist = createAsyncThunk<void, string>(
  "artists/deleteArtist",
  async (artistId) => {
    await axiosApi.delete(`artists/${artistId}`);
  }
)


export const publicateArtist = createAsyncThunk<void, string>(
  "artists/publicateArtist",
  async (artistId) => {
    await axiosApi.patch(`artists/${artistId}/togglePublished`);
  }
)

export const listOfArtists = (state: RootState) => state.artist.artists;
export const getLoading = (state: RootState) => state.artist.fetchArtistLoading;
export const getCreateArtistLoading = (state: RootState) => state.artist.createLoading;
export const getDeleteArtistLoading = (state: RootState) => state.artist.deleteLoading;

export const artistReducer = artistSlice.reducer;