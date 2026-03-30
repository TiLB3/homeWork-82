import express from "express";
import {Track} from "../models/Track";
import {TrackWithoutId} from "../types";
import {Error} from "mongoose";
import Artist from "../models/Artist";
import {Album} from "../models/Album";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res) => {
  const query: { album?: string } = {};

  if (req.query.album) {
    query.album = req.query.album as string;
  }

  try {
    const track = await Track.find(query).sort({trackNumber: 1}).populate("album");
    if(!track) return res.status(404).json({error: "No track found."});
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
    const isFindAlbum = await Album.findById(album);
    if(!isFindAlbum) return res.status(404).send({error: "Album not found"});

    const track = new Track(newTrack);
    await track.save();
    res.send(track);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(404).send({error: error});
    }

    next(error);
  }
})

export default trackRouter;