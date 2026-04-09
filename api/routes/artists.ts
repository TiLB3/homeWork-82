import express from "express";
import Artist from "../models/Artist";
import {Error, Types} from "mongoose";
import {ArtistWithoutId} from "../types";
import {imageUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import {Album} from "../models/Album";
import albumRouter from "./albums";

const artistRouter = express.Router();

artistRouter.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();

    return res.send(artists);
  } catch (e) {
    res.status(500);
  }
});

artistRouter.post("/", auth, imageUpload.single("photo"), async (req, res, next) => {
  try {
    const {name, information} = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).send({error: "Name is required"});
    }

    const newArtist: ArtistWithoutId = {
      name: name,
      photo: req.file ? "images/" + req.file.filename : null,
      information: information,
    }
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

artistRouter.delete("/:id", auth, permit("admin"), async (req, res, next) => {
  const {id} = req.params;
  const isValidId = Types.ObjectId.isValid(id as string);

  if (!isValidId) {
    return res.status(400).send({error: "Invalid ID"});
  }

  try {
    await Artist.findByIdAndDelete(id);
    res.send({message: "Artist deleted successfully."});
  } catch (e) {
    next(e);
  }
})


artistRouter.patch("/:id/togglePublished", auth, permit("admin"), async (req, res, next) => {
  try {
    const {id} = req.params;
    const isValidId = Types.ObjectId.isValid(id as string);

    if (!isValidId) {
      return res.status(400).send({error: "Invalid ID"});
    }

    const newArtist = await Artist.findById(id);

    if (!newArtist) {
      return res.send({error: "Album not found"});
    }

    newArtist.isPublished = !newArtist.isPublished;
    await newArtist.save();
    res.send(newArtist);
  } catch (e) {
    next(e);
  }
})

export default artistRouter;