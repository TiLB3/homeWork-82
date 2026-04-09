import express from "express";
import {Track} from "../models/Track";
import {TrackWithoutId} from "../types";
import {Error, Types} from "mongoose";
import Artist from "../models/Artist";
import {Album} from "../models/Album";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import artistRouter from "./artists";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res) => {
  const query: { album?: string } = {};

  if (req.query.album) {
    query.album = req.query.album as string;
  }

  try {
    const track = await Track.find(query).sort({trackNumber: 1}).populate("album");
    if (!track) return res.status(404).json({error: "No track found."});
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
    if (!isFindAlbum) return res.status(404).send({error: "Album not found"});

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


trackRouter.delete("/:id", auth, permit("admin"), async (req, res, next) => {
  const {id} = req.params;
  const isValidId = Types.ObjectId.isValid(id as string);

  if (!isValidId) {
    return res.status(400).send({error: "Invalid ID"});
  }

  try {
    await Track.findByIdAndDelete(id);
    res.send({message: "Track deleted successfully."});
  } catch (e) {
    next(e);
  }
})

trackRouter.patch("/:id/togglePublished", auth, permit("admin"), async (req, res, next) => {
  try {
    const {id} = req.params;
    const isValidId = Types.ObjectId.isValid(id as string);

    if (!isValidId) {
      return res.status(400).send({error: "Invalid ID"});
    }

    const newTrack = await Track.findById(id);

    if (!newTrack) {
      return res.send({error: "Track not found"});
    }

    newTrack.isPublished = !newTrack.isPublished;
    await newTrack.save();
    res.send(newTrack);
  } catch (e) {
    next(e);
  }
})

export default trackRouter;