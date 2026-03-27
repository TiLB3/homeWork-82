import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from "@mui/material";

interface Props {
  name: string;
  duration: string;
  trackNumber: number;
}

const TrackCard:React.FC<Props> = ({name, duration, trackNumber}) => {
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
        <CardActionArea>
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


            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 1}}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {trackNumber}
              </Typography>

            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default TrackCard;