import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const ToolBar = () => {
  return (
    <Box sx={{flexGrow: 1, marginBottom: 3}}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h5"
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'none',
                  sm: 'block',
                  textDecoration: 'none',
                  color: 'white',
                }
              }}
              component={NavLink}
              to="/"
            >
              Spotify
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ToolBar;