import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import type {ITrack} from "../types";
import dayjs from "dayjs";

interface Props {
  track: ITrack;
  dateTime: Date;
}

const TrackHistoryCard:React.FC<Props> = ({track,dateTime}) => {

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
            {track.album.artist.name}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            noWrap
          >
            {track.name}
          </Typography>

          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 1}}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {dayjs(dateTime).format('DD-MM-YYYY (dddd) - HH:mm')}
            </Typography>

          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackHistoryCard;