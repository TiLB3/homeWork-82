import {
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

interface Props {
  _id: string;
  name: string;
  photo: string | null;
}

const ArtistCard: React.FC<Props> = ({_id, name, photo}) => {
  let picture = noPic;
  if (photo) {
    picture = base_url + "/" + photo;
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
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ArtistCard;