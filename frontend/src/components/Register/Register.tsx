import {type ChangeEvent, useState} from "react";
import type {RegisterMutation} from "../../types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({...prev, [name]: value}));
  }

  const submitFormHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
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
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link to="/session">
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