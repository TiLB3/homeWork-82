import {CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/Artist/Artists.tsx";
import Albums from "./features/Album/Albums.tsx";
import Tracks from "./features/Track/Tracks.tsx";
import ToolBar from "./components/UI/ToolBar/ToolBar.tsx";
import Register from "./features/User/Register.tsx";
import Login from "./features/User/Login.tsx";
import TrackHistories from "./features/TrackHistory/TrackHistories.tsx";
import NewArtist from "./features/Artist/store/NewArtist.tsx";
import ProtectedRouter
  from "./components/UI/ProtectedRouter/ProtectedRouter.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {getUser} from "./features/User/store/usersSlice.ts";
import NewAlbum from "./features/Album/NewAlbum.tsx";
import NewTrack from "./features/Track/NewTrack.tsx";


const App = () => {
  const user = useAppSelector(getUser);

  return (
    <>
      <CssBaseline />
      <ToolBar />

      <Routes>
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/"
          element={<Artists />}
        />
        <Route
          path="/artists/new"
          element={
            <ProtectedRouter
              isAllowed={Boolean(user)}
              isNeedRedirect={true}
            ><NewArtist /></ProtectedRouter>}
        />
        <Route
          path="/albums"
          element={<Albums />}
        />
        <Route
          path="/albums/new"
          element={
            <ProtectedRouter
              isAllowed={Boolean(user)}
              isNeedRedirect={true}
            ><NewAlbum /></ProtectedRouter>}
        />
        <Route
          path="/tracks"
          element={<Tracks />}
        />
        <Route
          path="/tracks/new"
          element={
            <ProtectedRouter
              isAllowed={Boolean(user)}
              isNeedRedirect={true}
            ><NewTrack /></ProtectedRouter>}
        />
        <Route
          path="/track-history"
          element={<TrackHistories />}
        />
        <Route
          path="*"
          element={<h2>Not Found</h2>}
        />
      </Routes>
    </>
  )
}

export default App
