import express from "express";
import {Track} from "../models/Track";
import {TrackWithoutId} from "../types";
import {Error} from "mongoose";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res) => {
  const query: { artist?: string } = {};

  if (req.query.artist) {
    query.artist = req.query.artist as string;
  }

  try {
    const track = await Track.find({album: query}).populate("album", "artist");
    console.log(track);
    res.send(track);
  } catch {
    res.status(500);
  }
});

trackRouter.post('/', async (req, res, next) => {
  const {name, album, duration} = req.body;

  if (!name || !album || !duration) {
    return res.status(400).send({error: "Required name, album id and duration"});
  }

  const newTrack: TrackWithoutId = {
    name,
    album,
    duration,
  }

  try {
    const track = new Track(newTrack);
    await track.save();
    res.send(album);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(404).send({error: error});
    }

    next(error);
  }
})

export default trackRouter;