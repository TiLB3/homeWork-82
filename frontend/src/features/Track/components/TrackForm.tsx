import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {getUser} from "../../User/store/usersSlice.ts";
import React, {useEffect, useState} from "react";
import type {ITrackWithoutID} from "../../../types";
import {toast} from "react-toastify";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import styled from "@emotion/styled";
import {fetchTracks} from "../store/trackSlice.ts";
import {fetchAlbums, listOfAlbums} from "../../Album/store/albumSlice.ts";

interface Props {
  onSubmit: (newItem: ITrackWithoutID) => Promise<void>;
  loading: boolean;
}

const CustomTextField = styled(TextField)({
  width: "100%",
});

const TrackForm: React.FC<Props> = ({onSubmit, loading}) => {
  const user = useAppSelector(getUser);

  const [form, setForm] = useState<ITrackWithoutID>({
    name: "",
    album: "",
    duration: "",
    trackNumber: 0,
    user_id: user ? user._id : "",
  });

  const albums = useAppSelector(listOfAlbums);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length === 0 || form.album.trim().length === 0 || form.duration.trim().length === 0) {
      toast.error("You need to enter name,album,duration");
      return;
    }

    if (!user) return

    await onSubmit(form);

    setForm({
      name: "",
      album: "",
      duration: "",
      trackNumber: 0,
      user_id: user ? user._id : "",
    });
    await dispatch(fetchTracks());
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prevState => ({...prevState, [name]: value}));
  };

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
            id="album"
            label="Album"
            value={form.album}
            onChange={inputChangeHandler}
            name="album"
            sx={{width: "100%"}}
          >
            <MenuItem
              value=' '
              disabled
            >Select Album</MenuItem>
            {albums.map(album => (
              <MenuItem
                key={album._id}
                value={album._id}
              >{album.name}</MenuItem>
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
            id="duration"
            label="Duration"
            value={form.duration}
            onChange={inputChangeHandler}
            name="duration"
          />
        </Grid>
        <Grid>
          <CustomTextField
            type={"number"}
            id="trackNumber"
            label="TrackNumber"
            value={form.trackNumber}
            onChange={inputChangeHandler}
            name="trackNumber"
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

export default TrackForm;