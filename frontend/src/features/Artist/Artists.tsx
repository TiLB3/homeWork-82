import {Container, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchArtists, getLoading, listOfArtists} from "./store/artistSlice.ts";
import {useEffect} from "react";
import ArtistCard from "../../components/ArtistCard.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(listOfArtists);
  const loading = useAppSelector(getLoading);


  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchArtists());
    }

    void fetch();
  }, [dispatch]);

  return (
    <Container sx={{py: 4}}>
      <Grid
        container
        spacing={3}
      >
        {loading
          ? <Spinner isLoading={loading} />
          : artists.map((artist) => (
            <ArtistCard
              key={artist._id}
              _id={artist._id}
              name={artist.name}
              photo={artist.photo}
            />
          ))}
        {!loading && artists.length === 0 && (
          <>
            <Typography
              variant="h4"
            >
              Doesnt exist artists!
            </Typography>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Artists;