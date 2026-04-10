import mongoose, {Types} from "mongoose";
import {Album, AlbumSchema} from "./Album";
import User from "./User";

const Schema = mongoose.Schema;

export const TrackSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (userId: string) => {
        const user = await User.findById(userId);
        if (!user) return false

        return true;
      },
      message: "User's is not exist",
    }
  },
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
  },
  isPublished: {
    type: Boolean,
    default: false,
  }
});

TrackSchema.pre('deleteOne', {document: true}, async function () {
  await mongoose.model('TrackHistory').deleteMany({track_id: this._id});
});


export const Track = mongoose.model("Track", TrackSchema);

