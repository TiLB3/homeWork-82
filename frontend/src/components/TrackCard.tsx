import {Box, Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {getUser} from "../features/User/store/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {
  createTrackHistories
} from "../features/TrackHistory/store/trackHistorySlice.ts";
import {
  deleteTrack,
  fetchTracks,
  getDeleteTrackLoading,
  publicateTrack
} from "../features/Track/store/trackSlice.ts";

interface Props {
  name: string;
  duration: string;
  trackNumber: number;
  id: string;
  albumId: string | null;
  isPublished: boolean;
  user_id: string;
}

const TrackCard: React.FC<Props> = ({
                                      name,
                                      duration,
                                      trackNumber,
                                      id,
                                      albumId,
                                      isPublished,
                                      user_id
                                    }) => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getDeleteTrackLoading);

  const deleteEntity = async () => {
    await dispatch(deleteTrack(id));
    if (albumId) {
      await dispatch(fetchTracks(albumId));
    }
  }

  const publicateEntity = async () => {
    await dispatch(publicateTrack(id));
    if (albumId) {
      await dispatch(fetchTracks(albumId));
    }
  }

  const playTrack = async () => {
    if (!user) return;

    await dispatch(createTrackHistories({token: user.token, track_id: id}));
  }

  return (
    <Grid
      size={{xs: 12, sm: 6, md: 4, lg: 3}}
    >
      <Card
        sx={{
          height: '100%',
          borderRadius: 4,
          transition: '0.3s',
          '&:hover': {boxShadow: 10}
        }}
        style={{textDecoration: 'none'}}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            noWrap
          >
            {name}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            noWrap
          >
            {duration}
          </Typography>
          {user && <Button
            sx={{my: 1}}
            loading={loading}
            loadingPosition="end"
            variant="outlined"
            onClick={playTrack}
          >Play</Button>}


          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 1}}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {trackNumber}
            </Typography>

          </Box>
          {!isPublished && (
            <Typography
              variant="h6"
              component="div"
              noWrap
            >
              Неопубликованно
            </Typography>
          )}

          <Box sx={{display: "flex", alignItems: "center", columnGap: 4}}>
            {user && user.role === "admin" || (user?._id === user_id && !isPublished) && <Button
              sx={{my: 1}}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              onClick={deleteEntity}
            >delete</Button>}

            {user && user.role === "admin" && !isPublished && <Button
              sx={{my: 1}}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              onClick={publicateEntity}
            >Publicate</Button>}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackCard;