import {type ChangeEvent, useState} from "react";
import type {LoginMutation} from "../../types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Alert, Button, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getLoginError, login} from "./store/usersSlice.ts";

const Login = () => {
  const [form, setForm] = useState<LoginMutation>({
    username: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const error = useAppSelector(getLoginError);
  const navigate = useNavigate();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({...prev, [name]: value}));
  }

  const submitFormHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(login(form)).unwrap();
      navigate('/');
      setForm({
        username: "",
        password: "",
      });
      navigate("/");
    } catch (err) {
      setForm({
        username: "",
        password: "",
      });

      console.log(err);
    }
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        {error && (
          <Alert
            severity="error"
            sx={{mt: 3, width: '100%'}}
          >
            {error.error}
          </Alert>
        )}
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOpenIcon/>
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={submitFormHandler}
          sx={{mt: 3}}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid size={{xs: 12}}>
              <TextField
                sx={{width: "100%"}}
                required
                label="Username"
                name="username"
                autoComplete="new-username"
                value={form.username}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid size={{xs: 12}}>
              <TextField
                sx={{width: "100%"}}
                required
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign Up
          </Button>
          <Grid
            container
            justifyContent="flex-end"
          >
            <Grid>
              <Link to="/register">
                if you not registered yet, click here.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;