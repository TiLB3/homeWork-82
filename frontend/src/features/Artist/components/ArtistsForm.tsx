import {useState} from "react";
import type {IArtistWithoutID} from "../../../types";
import styled from "@emotion/styled";
import {Button, Grid, TextField} from "@mui/material";
import {getUser} from "../../User/store/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {fetchArtists} from "../store/artistSlice.ts";
import {toast} from "react-toastify";
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";

interface Props {
  onSubmit: (newItem: IArtistWithoutID) => Promise<void>;
  loading: boolean;
}

const CustomTextField = styled(TextField)({
  width: "100%",
});

const ArtistsForm: React.FC<Props> = ({onSubmit, loading}) => {
  const user = useAppSelector(getUser);
  const [form, setForm] = useState<IArtistWithoutID>({
    name: "",
    information: "",
    photo: null,
    user_id: user ? user._id : "",
  });

  const dispatch = useAppDispatch();

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length === 0) {
      toast.error("You need to enter name");
      return;
    }

    if (!user) return

    await onSubmit(form);

    setForm({
      name: "",
      information: "",
      photo: null,
      user_id: ""
    });
    await dispatch(fetchArtists());
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
            id="information"
            label="Information"
            value={form.information}
            onChange={inputChangeHandler}
            name="information"
          />
        </Grid>
        <Grid>
          <FileInput
            label="photo"
            name="photo"
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

export default ArtistsForm;