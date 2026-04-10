import mongoose from "mongoose";
import {Album} from "./Album";

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
  },
  isPublished: {
    type: Boolean,
    default: false,
  }
});

ArtistSchema.pre('deleteOne', { document: true }, async function() {
  const albums = await mongoose.model('Album').find({ artist: this._id });

  for (const album of albums) {
    await album.deleteOne();
  }
});


const Artist = mongoose.model("Artist", ArtistSchema);

export default Artist;