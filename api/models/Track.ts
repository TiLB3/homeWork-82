import mongoose, {Types} from "mongoose";
import {Album} from "./Album";

const Schema = mongoose.Schema;

export const TrackSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of track is required"],
  },
  album: {
    type: Types.ObjectId,
    ref: "Album",
    required: [true, "Album id is required"],
    validate: {
      validator: async (albumId: string) => {
        const album = await Album.findById(albumId);

        if (!album) return false

        return true;
      },
      message: "Album's is not exist",
    }
  },
  duration: {
    type: String,
    required: [true, "duration is required"],
  },
  trackNumber: {
    type: Number,
    required: [true, "Track number is required"],
  }
});



export const Track = mongoose.model("Track", TrackSchema);

