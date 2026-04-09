import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
  fetchTrackHistories,
  getListOfTrackHistories,
  getLoadingTrackHistories
} from "./store/trackHistorySlice.ts";
import {getUser} from "../User/store/usersSlice.ts";
import {useNavigate} from "react-router-dom";
import TrackHistoryCard from "../../components/TrackHistoryCard.tsx";
import {useEffect} from "react";
import {toast} from "react-toastify";

const TrackHistories = () => {
  const dispatch = useAppDispatch();
  const tracksHistories = useAppSelector(getListOfTrackHistories);
  const user = useAppSelector(getUser);
  const loading = useAppSelector(getLoadingTrackHistories);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.warn("You are not logged in");
      navigate("/")
      return;
    }

    const fetch = async () => {
      if (user && user.token) {
        await dispatch(fetchTrackHistories(user.token));
      }

    }

    void fetch();
  }, [dispatch, user])

  if (!user) {
    navigate("/");
  }

  return (
    <Container sx={{py: 5}}>
      <Box sx={{mb: 4}}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="bold"
        >
          Прослушанные треки :{user && user.username}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
        >
          Список трэков
        </Typography>
        <Divider sx={{mt: 2}} />
      </Box>
      <Grid
        container
        spacing={4}
      >
        {loading
          ? <Spinner isLoading={loading} />
          : tracksHistories.map((trackHistory) => (
            <TrackHistoryCard
              key={trackHistory._id}
              dateTime={trackHistory.datetime}
              track={trackHistory.track_id}
            />
          ))}
        {!loading && tracksHistories.length === 0 && (
          <>
            <Typography
              variant="h4"
            >
              Doesnt exist tracks history!
            </Typography>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default TrackHistories;