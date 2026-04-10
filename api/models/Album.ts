import mongoose, {Types} from "mongoose";
import Artist from "./Artist";
import User from "./User";

const Schema = mongoose.Schema;

export const AlbumSchema = new Schema({
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
    required: [true, "Name of album is required"],
  },
  artist: {
    type: Types.ObjectId,
    ref: "Artist",
    required: [true, "Artist id is required"],
    validate: {
      validator: async (artistId: string) => {
        const artist = await Artist.findById(artistId);
        if (!artist) return false

        return true;
      },
      message: "Artist's is not exist",
    }
  },
  releaseDate: {
    type: Number,
    required: [true, "Release date is required"],
  },
  albumCover: {
    type: String,
    default: null,
  },
  isPublished: {
    type: Boolean,
    default: false,
  }
});

AlbumSchema.pre('deleteOne', { document: true }, async function() {
  const tracks = await mongoose.model('Track').find({ album: this._id });

  for (const track of tracks) {
    await track.deleteOne();
  }
});

export const Album = mongoose.model("Album", AlbumSchema);

