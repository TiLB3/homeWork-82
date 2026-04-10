import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {getUser} from "../User/store/usersSlice.ts";
import type {ITrackWithoutID} from "../../types";
import {Box, Typography} from "@mui/material";
import {createTrack, getCreateTrackLoading} from "./store/trackSlice.ts";
import TrackForm from "./components/TrackForm.tsx";

const NewTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(getCreateTrackLoading);
  const user = useAppSelector(getUser);


  const onCreateNewArtist = async (newTrack: ITrackWithoutID) => {
    if (!user) return;
    await dispatch(createTrack(newTrack));
    navigate("/");
  };

  return (
    <Box sx={{width: '50%', margin: '20px auto'}}>
      <Typography
        variant="h4"
        sx={{textAlign: 'center', mb: 4}}
      >
        New Track
      </Typography>

      <TrackForm onSubmit={onCreateNewArtist} loading={loading} />
    </Box>
  );
};

export default NewTrack;