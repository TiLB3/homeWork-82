import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {getUser} from "../../User/store/usersSlice.ts";
import type {IAlbumWithoutID} from "../../../types";
import {fetchArtists, listOfArtists} from "../../Artist/store/artistSlice.ts";
import {toast} from "react-toastify";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import styled from "@emotion/styled";
import {fetchAlbums} from "../store/albumSlice.ts";

interface Props {
  onSubmit: (newItem: IAlbumWithoutID) => Promise<void>;
  loading: boolean;
}

const CustomTextField = styled(TextField)({
  width: "100%",
});

const AlbumForm: React.FC<Props> = ({onSubmit, loading}) => {
  const user = useAppSelector(getUser);

  const [form, setForm] = useState<IAlbumWithoutID>({
    name: "",
    artist: "",
    releaseDate: "",
    albumCover: null,
    user_id: user ? user._id : "",
  });

  const artists = useAppSelector(listOfArtists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length === 0 || form.artist.trim().length === 0 || form.releaseDate.trim().length === 0) {
      toast.error("You need to enter name,artist,releaseDate");
      return;
    }

    if (!user) return

    await onSubmit(form);

    setForm({
      name: "",
      artist: "",
      releaseDate: "",
      albumCover: null,
      user_id: user ? user._id : "",
    });
    await dispatch(fetchAlbums());
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prevState => ({...prevState, [name]: value}));
  };

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
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid
        container
        direction="column"
        spacing={2}
      >

        <Grid>
          <TextField
            select
            id="artist"
            label="Artist"
            value={form.artist}
            onChange={inputChangeHandler}
            name="artist"
            sx={{width: "100%"}}
          >
            <MenuItem
              value=' '
              disabled
            >Select Artist</MenuItem>
            {artists.map(artist => (
              <MenuItem
                key={artist._id}
                value={artist._id}
              >{artist.name}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid>
          <CustomTextField
            id="name"
            label="Name"
            value={form.name}
            onChange={inputChangeHandler}
            name="name"
          />
        </Grid>
        <Grid>
          <CustomTextField
            multiline
            rows={3}
            id="releaseDate"
            label="ReleaseDate"
            value={form.releaseDate}
            onChange={inputChangeHandler}
            name="releaseDate"
          />
        </Grid>
        <Grid>
          <FileInput
            label="albumCover"
            name="albumCover"
            onChange={fileInputChangeHandler}
          />
        </Grid>
        <Grid>
          <Button
            disabled={loading}
            type="submit"
            color="primary"
            variant="contained"
          >Create</Button>
          <Spinner isLoading={loading} />
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;