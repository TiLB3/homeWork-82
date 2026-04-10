import {useState} from "react";
import type {IUser} from "../../../types";
import {Box, Button, Menu, MenuItem} from '@mui/material';
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks.ts";
import {logout} from "../../../features/User/store/usersSlice.ts";

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [addEntity, setAddEntity] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClickAddEntity = (e: React.MouseEvent<HTMLElement>) => {
    setAddEntity(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleCloseAddEntity = () => {
    setAddEntity(null);
  }
  return (
    <Box sx={{display: "flex", alignItems: "center", columnGap: "1rem"}}>
      <Box>
        <Button
          onClick={handleClick}
          color="inherit"
        >
          Hello, {user.username}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            component={NavLink}
            to="/track-history"
            color="inherit"
            sx={{
              "&:hover": {
                color: "lightGray",
                transition: "0.3s"
              },
            }}
          >Track history</MenuItem>
          <MenuItem
            color="inherit"
            sx={{
              "&:hover": {
                color: "lightGray",
                transition: "0.3s"
              },
            }}
            onClick={() => dispatch(logout())}
          >Logout</MenuItem>
        </Menu>
      </Box>

      <Box>
        <Button
          onClick={handleClickAddEntity}
          color="inherit"
        >
          Add new entity
        </Button>
        <Menu
          anchorEl={addEntity}
          keepMounted
          open={Boolean(addEntity)}
          onClose={handleCloseAddEntity}
        >
          <MenuItem
            component={NavLink}
            to="/artists/new"
            color="inherit"
            sx={{
              "&:hover": {
                color: "lightGray",
                transition: "0.3s"
              },
            }}
          >Add artist</MenuItem>
          <MenuItem
            component={NavLink}
            to="/albums/new"
            color="inherit"
            sx={{
              "&:hover": {
                color: "lightGray",
                transition: "0.3s"
              },
            }}
          >Add album</MenuItem>
          <MenuItem
            component={NavLink}
            to="/tracks/new"
            color="inherit"
            sx={{
              "&:hover": {
                color: "lightGray",
                transition: "0.3s"
              },
            }}
          >Add track</MenuItem>
        </Menu>
      </Box>


    </Box>
  );
};

export default UserMenu;