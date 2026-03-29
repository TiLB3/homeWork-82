import {Box, Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {getUser} from "../features/User/store/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {
  createTrackHistories, getLoadingTrackHistories
} from "../features/TrackHistory/store/trackHistorySlice.ts";

interface Props {
  name: string;
  duration: string;
  trackNumber: number;
  id: string;
}

const TrackCard: React.FC<Props> = ({name, duration, trackNumber, id}) => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getLoadingTrackHistories);

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
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackCard;