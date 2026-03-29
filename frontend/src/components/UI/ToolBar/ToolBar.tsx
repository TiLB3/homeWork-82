import {AppBar, Box, Container, Grid, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";
import {useAppSelector} from "../../../app/hooks.ts";
import {getUser} from "../../../features/User/store/usersSlice.ts";

const ToolBar = () => {
  const user = useAppSelector(getUser);

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


            <Grid>
              {user ? (
                <UserMenu user={user} />
              ) : (
                <AnonymousMenu />
              )}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ToolBar;