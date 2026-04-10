import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {getUser} from "../User/store/usersSlice.ts";
import type {IAlbumWithoutID} from "../../types";
import {Box, Typography} from "@mui/material";
import {createAlbum, getCreateAlbumLoading} from "./store/albumSlice.ts";
import AlbumForm from "./components/AlbumForm.tsx";

const NewAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(getCreateAlbumLoading);
  const user = useAppSelector(getUser);


  const onCreateNewArtist = async (newAlbum: IAlbumWithoutID) => {
    if (!user) return;
    await dispatch(createAlbum(newAlbum));
    navigate("/");
  };

  return (
    <Box sx={{width: '50%', margin: '20px auto'}}>
      <Typography
        variant="h4"
        sx={{textAlign: 'center', mb: 4}}
      >
        New Album
      </Typography>

      <AlbumForm onSubmit={onCreateNewArtist} loading={loading} />
    </Box>
  );
};

export default NewAlbum;