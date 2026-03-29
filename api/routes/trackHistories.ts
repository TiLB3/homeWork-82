import express from "express";
import {Track} from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistory = express.Router();

trackHistory.get('/', auth, async (req, res) => {
  const reqWithUser = req as RequestWithUser;
  const tracksHistories = await TrackHistory.find({user_id: reqWithUser.user._id});

  res.send(tracksHistories);
})

trackHistory.post("/", auth, async (req, res) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.body.track_id);
  const reqWithUser = req as RequestWithUser;

  if (!isValidId) {
    return res.status(401).send("Not valid id");
  }

  const track = await Track.findById(req.body.track_id);
  if (!track) {
    return res.status(401).send("Such track does not exist");
  }

  const trackHistory = new TrackHistory({
    user_id: reqWithUser.user._id,
    track_id: track._id,
  });
  await trackHistory.save();

  res.send(trackHistory);
})


export default trackHistory;