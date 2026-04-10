import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchTracks, getLoading, listOfTracks} from "./store/trackSlice.ts";
import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import TrackCard from "../../components/TrackCard.tsx";
import {fetchAlbum, getAlbum} from "../Album/store/albumSlice.ts";
import ProtectedRouter
  from "../../components/UI/ProtectedRouter/ProtectedRouter.tsx";
import {getUser} from "../User/store/usersSlice.ts";

const Tracks = () => {
  const loading = useAppSelector(getLoading);
  const tracks = useAppSelector(listOfTracks);
  const album = useAppSelector(getAlbum);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const albumId = searchParams.get('album');
  const user = useAppSelector(getUser);

  useEffect(() => {

    const fetch = async () => {
      if (albumId) {
        await dispatch(fetchAlbum(albumId));
        await dispatch(fetchTracks(albumId));
      }
    }

    void fetch();
  }, [dispatch, albumId]);
  return (
    <Container sx={{py: 5}}>
      <Box sx={{mb: 4}}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="bold"
        >
          {album && album.artist.name}
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="bold"
        >
          {tracks.length > 0 && tracks[0].album.name}
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
          : tracks.map((track) => (
            <ProtectedRouter
              key={track._id}
              isAllowed={user?.role === 'admin' || user?._id === track.user_id || track.isPublished}
            >

              <TrackCard
                id={track._id}
                name={track.name}
                duration={track.duration}
                trackNumber={track.trackNumber}
                isPublished={track.isPublished}
                albumId={albumId}
                user_id={track.user_id}
              />
            </ProtectedRouter>
          ))}
        {!loading && tracks.length === 0 && (
          <>
            <Typography
              variant="h4"
            >
              Doesnt exist tracks!
            </Typography>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Tracks;