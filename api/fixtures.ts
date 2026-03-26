import mongoose from "mongoose";
import {config} from "./config";
import User from "./models/User";
import Artist from "./models/Artist";
import {Album} from "./models/Album";
import {Track} from "./models/Track";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
  } catch (err) {
    console.log("collection where not present,skipping drop");
  }

  const [admin, user] = await User.create(
    {username: "admin", password: "12345", token: "123"},
    {username: "joe", password: "56789", token: "567"},
  );

  if (!admin || !user) return;


  const [eminem, britni] = await Artist.create(
    {name: "eminem", photo: "fixtures/images/image-57.png", information: null},
    {name: "britni", photo: null, information: null},
  );

  if (!eminem || !britni) return;

  const [eminemAlbum1, eminemAlbum2, britniAlbum1, britniAlbum2] = await Album.create(
    {
      name: "refill",
      albumCover: "fixtures/images/refill.jpg",
      releaseDate: 2009,
      artist: eminem._id
    },
    {
      name: "encore",
      albumCover: "fixtures/images/refill.jpg",
      releaseDate: 2008,
      artist: eminem._id
    },
    {
      name: "britney",
      releaseDate: 2001,
      artist: britni._id
    },
    {
      name: "circus",
      releaseDate: 2008,
      artist: britni._id
    },
  );

  if (!eminemAlbum1 || !eminemAlbum2 || !britniAlbum1 || !britniAlbum2) return;

  await Track.create(
    {name: "mockingbird1",duration: "3:40",trackNumber: 1,album: eminemAlbum1._id},
    {name: "mockingbird2",duration: "3:40",trackNumber: 2,album: eminemAlbum1._id},
    {name: "mockingbird3",duration: "3:40",trackNumber: 3,album: eminemAlbum1._id},
    {name: "mockingbird4",duration: "3:40",trackNumber: 4,album: eminemAlbum1._id},
    {name: "mockingbird5",duration: "3:40",trackNumber: 5,album: eminemAlbum1._id},
    {name: "stan",duration: "3:50",trackNumber: 6,album: eminemAlbum2._id},
    {name: "stan",duration: "3:50",trackNumber: 7,album: eminemAlbum2._id},
    {name: "stan",duration: "3:50",trackNumber: 8,album: eminemAlbum2._id},
    {name: "stan",duration: "3:50",trackNumber: 9,album: eminemAlbum2._id},
    {name: "stan",duration: "3:50",trackNumber: 10,album: eminemAlbum2._id},
    {name: "mama im criminal",duration: "4:50",trackNumber: 11,album: britniAlbum1._id},
    {name: "mama im criminal",duration: "4:50",trackNumber: 12,album: britniAlbum1._id},
    {name: "mama im criminal",duration: "4:50",trackNumber: 13,album: britniAlbum1._id},
    {name: "mama im criminal",duration: "4:50",trackNumber: 14,album: britniAlbum1._id},
    {name: "mama im criminal",duration: "4:50",trackNumber: 15,album: britniAlbum1._id},
    {name: "give me more",duration: "2:50",trackNumber: 16,album: britniAlbum2._id},
    {name: "give me more",duration: "2:50",trackNumber: 17,album: britniAlbum2._id},
    {name: "give me more",duration: "2:50",trackNumber: 18,album: britniAlbum2._id},
    {name: "give me more",duration: "2:50",trackNumber: 19,album: britniAlbum2._id},
    {name: "give me more",duration: "2:50",trackNumber: 20,album: britniAlbum2._id},
  );

  await db.close();
}

run().catch(err => console.error(err));