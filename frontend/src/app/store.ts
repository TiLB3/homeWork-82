import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../features/Artist/store/artistSlice.ts";
import {albumReducer} from "../features/Album/store/albumSlice.ts";
import {trackReducer} from "../features/Track/store/trackSlice.ts";
import {userReducer} from "../features/User/store/usersSlice.ts";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";
import {
  trackhistoryReducer
} from "../features/TrackHistory/store/trackHistorySlice.ts";

const customStorage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const usersPersistConfig = {
  key: 'store:user',
  storage: customStorage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  artist: artistReducer,
  album: albumReducer,
  track: trackReducer,
  trackhistory: trackhistoryReducer,
  user: persistReducer(usersPersistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
