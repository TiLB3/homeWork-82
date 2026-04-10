import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import noPic from "../assets/NoPic.png";
import {base_url} from "../globalConstants.ts";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {
  deleteArtist,
  fetchArtists,
  getDeleteArtistLoading, publicateArtist
} from "../features/Artist/store/artistSlice.ts";
import {getUser} from "../features/User/store/usersSlice.ts";

interface Props {
  _id: string;
  name: string;
  photo: string | null;
  isPublished: boolean;
  user_id: string;
}

const ArtistCard: React.FC<Props> = ({_id, name, photo, isPublished,user_id}) => {
  let picture = noPic;
  if (photo) {
    picture = base_url + "/" + photo;
  }

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const loading = useAppSelector(getDeleteArtistLoading);

  const deleteEntity = async () => {
    await dispatch(deleteArtist(_id));
    await dispatch(fetchArtists());
  }

  const publicateEntity = async () => {
    await dispatch(publicateArtist(_id));
    await dispatch(fetchArtists());
  }

  return (
    <Grid
      size={{xs: 12, sm: 6, md: 4}}
    >
      <Card
        sx={{
          height: '100%',
          borderRadius: 3,
          boxShadow: 3,
          textDecoration: "none"
        }}
        component={NavLink}
        to={`/albums?artist=${_id}`}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={picture}
            alt={name}
            sx={{objectFit: 'cover'}}
          />
          <CardContent>
            <Typography

              gutterBottom
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
          </CardContent>
        </CardActionArea>
      </Card>
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

    </Grid>
  );
};

export default ArtistCard;