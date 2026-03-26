import express from "express";
import User from "../models/User";
import {Track} from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";

const trackHistory = express.Router();

trackHistory.get('/',async (req, res) => {
  const query: {track_id?: string} = {};

  if(req.query.track_id){
    query.track_id = req.query.track_id as string;
  }

  const tracksHistories = await TrackHistory.find(query);

  res.send(tracksHistories);
})

trackHistory.post("", async (req, res) => {
  const token = req.get("Authorization");

  if (!token) {
    return res.status(401).send("No token present");
  }

  const user = await User.findOne({token});
  if (!user) {
    return res.status(401).send("Wrong token, unauthorized");
  }

  const isValidId = mongoose.Types.ObjectId.isValid(req.body.track_id);

  if(!isValidId) {
    return res.status(401).send("Not valid id");
  }

  const track = await Track.findById(req.body.track_id);
  if (!track) {
    return res.status(401).send("Such track does not exist");
  }

  const trackHistory = new TrackHistory({
    user_id: user._id,
    track_id: track._id,
  });
  await trackHistory.save();

  res.send(trackHistory);
})


export default trackHistory;