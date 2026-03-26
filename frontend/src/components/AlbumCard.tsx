import {Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import noPic from "../assets/NoPic.png";
import {base_url} from "../globalConstants.ts";

interface Props {
  _id: string;
  name: string;
  releaseDate: number;
  albumCover: string | null;
}

const AlbumCard: React.FC<Props> = ({
                                      _id,
                                      name,
                                      releaseDate,
                                      albumCover
                                    }) => {
  let picture = noPic;
  if(albumCover) {
    picture = base_url + "/" + albumCover;
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
    </Grid>
  );
};

export default AlbumCard;