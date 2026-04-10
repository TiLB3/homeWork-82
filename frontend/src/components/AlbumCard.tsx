import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";
import noPic from "../assets/NoPic.png";
import {base_url} from "../globalConstants.ts";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {getUser} from "../features/User/store/usersSlice.ts";
import {
  deleteAlbum,
  fetchAlbums,
  getDeleteAlbumLoading,
  publicateAlbum
} from "../features/Album/store/albumSlice.ts";

interface Props {
  _id: string;
  name: string;
  releaseDate: number;
  albumCover: string | null;
  isPublished: boolean;
  artistId: string | null;
}

const AlbumCard: React.FC<Props> = ({
                                      _id,
                                      name,
                                      releaseDate,
                                      albumCover,
                                      isPublished,
                                      artistId
                                    }) => {
  let picture = noPic;
  if (albumCover) {
    picture = base_url + "/" + albumCover;
  }

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const loading = useAppSelector(getDeleteAlbumLoading);

  const deleteEntity = async () => {
    await dispatch(deleteAlbum(_id));
    if (artistId) {
      await dispatch(fetchAlbums(artistId));
    }
  }

  const publicateEntity = async () => {
    await dispatch(publicateAlbum(_id));
    if (artistId) {
      await dispatch(fetchAlbums(artistId));
    }
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
        component={NavLink}
        to={`/tracks?album=${_id}`}
        style={{textDecoration: 'none'}}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="280"
            image={picture}
            alt={name}
            sx={{objectFit: 'cover'}}
          />
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              noWrap
            >
              {name}
            </Typography>
            {!isPublished && (
              <Typography
                variant="h6"
                component="div"
                noWrap
              >
                Неопубликованно
              </Typography>
            )}

            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 1}}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {releaseDate}
              </Typography>

            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box sx={{display: "flex", alignItems: "center", columnGap: 4}}>
        {user && user.role === "admin" && <Button
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
    </Grid>
  );
};

export default AlbumCard;