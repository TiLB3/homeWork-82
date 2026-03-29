import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => {
  return (
    <>
      <Button
        component={NavLink}
        to="/register"
        color="inherit"
        sx={{
          "&:hover": {
            color: "lightGray",
            transition: "0.3s"
          },
        }}
      >
        Sign up
      </Button>

      <Button
        component={NavLink}
        to="/login"
        color="inherit"
        sx={{
          "&:hover": {
            color: "lightGray",
            transition: "0.3s"
          },
        }}
      >
        Sign in
      </Button>
    </>
  );
};

export default AnonymousMenu;