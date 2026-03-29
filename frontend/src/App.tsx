import {CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/Artist/Artists.tsx";
import Albums from "./features/Album/Albums.tsx";
import Tracks from "./features/Track/Tracks.tsx";
import ToolBar from "./components/UI/ToolBar/ToolBar.tsx";
import Register from "./features/User/Register.tsx";
import Login from "./features/User/Login.tsx";


const App = () => {

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
          path="/albums"
          element={<Albums />}
        />
        <Route
          path="/tracks"
          element={<Tracks />}
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
