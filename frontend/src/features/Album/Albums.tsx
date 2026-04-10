import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchAlbums, getLoading, listOfAlbums} from "./store/albumSlice.ts";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import AlbumCard from "../../components/AlbumCard.tsx";
import ProtectedRouter
  from "../../components/UI/ProtectedRouter/ProtectedRouter.tsx";
import {getUser} from "../User/store/usersSlice.ts";

const Albums = () => {
  const loading = useAppSelector(getLoading);
  const albums = useAppSelector(listOfAlbums);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('artist');
  const user = useAppSelector(getUser);

  useEffect(() => {
    const fetch = async () => {
      if (artistId) await dispatch(fetchAlbums(artistId));
    }

    void fetch();
  }, [dispatch]);

  return (
    <Container sx={{py: 5}}>
      <Box sx={{mb: 4}}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="bold"
        >
          {albums.length > 0 && albums[0].artist.name}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
        >
          Список альбомов
        </Typography>
        <Divider sx={{mt: 2}} />
      </Box>
      <Grid
        container
        spacing={4}
      >
        {loading
          ? <Spinner isLoading={loading} />
          : albums.map((album) => (
            <ProtectedRouter
              key={album._id}
              isAllowed={user?.role === 'admin' || album.isPublished}
            >
              <AlbumCard
                _id={album._id}
                name={album.name}
                albumCover={album.albumCover}
                releaseDate={album.releaseDate}
              />
            </ProtectedRouter>
          ))}
        {!loading && albums.length === 0 && (
          <>
            <Typography
              variant="h4"
            >
              Doesnt exist albums!
            </Typography>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Albums;