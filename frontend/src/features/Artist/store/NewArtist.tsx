import {Box, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {getUser} from "../../User/store/usersSlice.ts";
import type {IArtistWithoutID} from "../../../types";
import {createArtist, getCreateArtistLoading} from "./artistSlice.ts";


const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(getCreateArtistLoading);
  const user = useAppSelector(getUser);


  const onCreateNewItem = async (newArtist: IArtistWithoutID) => {
    if (!user) return;
    await dispatch(createArtist(newArtist));
    navigate("/");
  };

  return (
    <Box sx={{width: '50%', margin: '20px auto'}}>
      <Typography
        variant="h4"
        sx={{textAlign: 'center', mb: 4}}
      >
        New Item
      </Typography>


    </Box>
  );
};

export default NewArtist;