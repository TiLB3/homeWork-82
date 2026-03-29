import {configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../features/Artist/store/artistSlice.ts";
import {albumReducer} from "../features/Album/store/albumSlice.ts";
import {trackReducer} from "../features/Track/store/trackSlice.ts";
import {userReducer} from "../features/User/store/usersSlice.ts";

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumReducer,
    track: trackReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
