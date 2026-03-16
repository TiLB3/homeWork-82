import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: null,
  },
  information: {
    type: String,
    default: null,
  }
});

const Artist = mongoose.model("Artist", ArtistSchema);

export default Artist;