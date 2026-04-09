import {Router} from "express";
import {Album} from "../models/Album";
import mongoose, {Error, Types} from "mongoose";
import {AlbumWithoutId} from "../types";
import {imageUpload} from "../multer";
import Artist from "../models/Artist";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import artistRouter from "./artists";
import {Track} from "../models/Track";
import trackRouter from "./tracks";

const albumRouter = Router();

albumRouter.get('/', async (req, res) => {
  const query: { artist?: string } = {};

  if (req.query.artist) {
    query.artist = req.query.artist as string;
  }

  try {
    const albums = await Album.find(query).sort({releaseDate: -1}).populate("artist");

    res.send(albums);
  } catch {
    res.status(500);
  }
});

albumRouter.get('/:id', async (req, res) => {
  const {id} = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!id || !isValidId) {
    return res.status(400).send({error: "Invalid ID"});
  }

  try {
    const album = await Album.findById(id).populate("artist");

    if (!album) {
      return res.status(404).send({error: "Album not found"});
    }

    return res.send(album);
  } catch (e) {
    res.status(500);
  }
});

albumRouter.post('/', imageUpload.single("albumCover"), async (req, res, next) => {
  const {name, artist, releaseDate} = req.body;

  if (!name || !artist || !releaseDate) {
    return res.status(400).send({error: "Required name, artist id and releaseDate"});
  }

  const newAlbum: AlbumWithoutId = {
    name,
    artist,
    releaseDate,
    albumCover: req.file ? "images/" + req.file.filename : null,
  }

  try {
    const isFindArtist = await Artist.findById(artist);
    if(!isFindArtist) return res.status(404).send({error: "unknown Artist"});

    const album = new Album(newAlbum);
    await album.save();
    res.send(album);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(404).send({error: error});
    }

    next(error);
  }
})


albumRouter.delete("/:id", auth, permit("admin"), async (req, res,next) => {
  const {id} = req.params;
  const isValidId = Types.ObjectId.isValid(id as string);

  if(!isValidId) {
    return res.status(400).send({error: "Invalid ID"});
  }

  try {
    await Album.findByIdAndDelete(id);
    res.send({message: "Album deleted successfully."});
  } catch (e) {
    next(e);
  }
})


albumRouter.patch("/:id/togglePublished", auth, permit("admin"), async (req, res, next) => {
  try {
    const {id} = req.params;
    const isValidId = Types.ObjectId.isValid(id as string);

    if (!isValidId) {
      return res.status(400).send({error: "Invalid ID"});
    }

    const newAlbum = await Album.findById(id);

    if (!newAlbum) {
      return res.send({error: "Album not found"});
    }

    newAlbum.isPublished = !newAlbum.isPublished;
    await newAlbum.save();
    res.send(newAlbum);
  } catch (e) {
    next(e);
  }
})

export default albumRouter;