import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
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
  track_id: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  }
});




const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
export default TrackHistory;