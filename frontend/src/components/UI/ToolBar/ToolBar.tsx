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
            <Typography
              variant="h5"
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                  textDecoration: 'none',
                  color: 'white',
                  "&:hover": {
                    color: "lightGray",
                    transition: "0.3s"
                  }
                }
              }}
              component={NavLink}
              to="/users"
            >
              Click to register/login
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ToolBar;