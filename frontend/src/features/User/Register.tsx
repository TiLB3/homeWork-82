import {type ChangeEvent, useState} from "react";
import type {RegisterMutation} from "../../types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Button, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getRegisterError, register} from "./store/usersSlice.ts";
import FileInput from "../../components/UI/FileInput/FileInput.tsx";

const Register = () => {
  const [form, setForm] = useState<RegisterMutation>({
    username: '',
    password: '',
    displayName: '',
    avatar: null
  });

  const dispatch = useAppDispatch();
  const error = useAppSelector(getRegisterError);
  const navigate = useNavigate();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({...prev, [name]: value}));
  }

  const submitFormHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(register(form)).unwrap();
      setForm({
        username: '',
        password: '',
        displayName: '',
        avatar: null
      });
      navigate("/");
    } catch (err) {
      setForm({
        username: '',
        password: '',
        displayName: '',
        avatar: null
      });

      console.log(err);
    }
  }

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined
    }
  }

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
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
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign up
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
                error={Boolean(getFieldError("username"))}
                helperText={getFieldError("username")}
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
                error={Boolean(getFieldError("password"))}
                helperText={getFieldError("password")}
              />
            </Grid>
            <Grid size={{xs: 12}}>
              <TextField
                sx={{width: "100%"}}
                required
                name="displayName"
                label="Your name"
                type="displayName"
                value={form.displayName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError("displayName"))}
                helperText={getFieldError("displayName")}
              />
            </Grid>
            <Grid>
              <FileInput
                label="avatar"
                name="avatar"
                onChange={fileInputChangeHandler}
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
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;