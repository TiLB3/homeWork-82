import {useState} from "react";
import type {IUser} from "../../../types";
import {Button, Menu, MenuItem} from '@mui/material';
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks.ts";
import {logout} from "../../../features/User/store/usersSlice.ts";

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <>
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

    </>
  );
};

export default UserMenu;