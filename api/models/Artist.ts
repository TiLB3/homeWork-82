import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
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