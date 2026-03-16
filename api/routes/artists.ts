import express from "express";
import Artist from "../models/Artist";
import {Error} from "mongoose";
import {ArtistWithoutId} from "../types";
import {imageUpload} from "../multer";

const artistRouter = express.Router();

artistRouter.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();

    return res.send(artists);
  } catch (e) {
    res.status(500);
  }
});

artistRouter.post("/", imageUpload.single("photo") , async (req, res, next) => {
  const {name, information} = req.body;

  if (!name || name.trim().length === 0) {
    return res.status(400).send({error: "Name is required"});
  }

  const newArtist: ArtistWithoutId = {
    name: name,
    photo: req.file ? "images/" + req.file.filename : null,
    information: information,
  }

  try {
    const artist = new Artist(newArtist);
    await artist.save();
    res.send(artist);

  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    next(error);
  }
})

export default artistRouter;