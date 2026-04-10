import mongoose from "mongoose";
import {config} from "./config";
import User from "./models/User";
import Artist from "./models/Artist";
import {Album} from "./models/Album";
import {Track} from "./models/Track";
import TrackHistory from "./models/TrackHistory";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
    await db.dropCollection("trackhistories");
  } catch (err) {
    console.log("collection where not present,skipping drop");
  }

  const admin = new User(
    {username: "admin", password: "12345", role: "admin", token: ""}
  );

  admin.generateToken();

  const user = new User(
    {username: "joe", password: "56789", role: "user", token: ""},
  );

  user.generateToken();

  await admin.save();
  await user.save();


  if (!admin || !user) return;


  const [eminem, britni, tsoi] = await Artist.create(
    {
      name: "eminem",
      photo: "fixtures/images/image-57.png",
      information: null,
      isPublished: true,
      user_id: admin._id,
    },
    {
      name: "britni",
      photo: null,
      information: null,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "цой",
      photo: "fixtures/images/image-57.png",
      information: null,
      isPublished: false,
      user_id: user._id
    },
  );

  if (!eminem || !britni || !tsoi) return;

  const [eminemAlbum1, eminemAlbum2, britniAlbum1, britniAlbum2, star] = await Album.create(
    {
      name: "refill",
      albumCover: "fixtures/images/refill.jpg",
      releaseDate: 2009,
      artist: eminem._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "encore",
      albumCover: "fixtures/images/refill.jpg",
      releaseDate: 2008,
      artist: eminem._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "britney",
      releaseDate: 2001,
      artist: britni._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "circus",
      releaseDate: 2008,
      artist: britni._id,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "star name sun",
      releaseDate: 1999,
      artist: tsoi._id,
      isPublished: false,
      user_id: user._id
    },
  );

  if (!eminemAlbum1 || !eminemAlbum2 || !britniAlbum1 || !britniAlbum2 || !star) return;

  const [one, two, three] = await Track.create(
    {
      name: "mockingbird1",
      duration: "3:40",
      trackNumber: 1,
      album: eminemAlbum1._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "mockingbird2",
      duration: "3:40",
      trackNumber: 2,
      album: eminemAlbum1._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "mockingbird3",
      duration: "3:40",
      trackNumber: 3,
      album: eminemAlbum1._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "mockingbird4",
      duration: "3:40",
      trackNumber: 4,
      album: eminemAlbum1._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "mockingbird5",
      duration: "3:40",
      trackNumber: 5,
      album: eminemAlbum1._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "stan", duration: "3:50", trackNumber: 6, album: eminemAlbum2._id,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "stan", duration: "3:50", trackNumber: 7, album: eminemAlbum2._id,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "stan", duration: "3:50", trackNumber: 8, album: eminemAlbum2._id,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "stan", duration: "3:50", trackNumber: 9, album: eminemAlbum2._id,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "stan", duration: "3:50", trackNumber: 10, album: eminemAlbum2._id,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "mama im criminal",
      duration: "4:50",
      trackNumber: 11,
      album: britniAlbum1._id,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "mama im criminal",
      duration: "4:50",
      trackNumber: 12,
      album: britniAlbum1._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "mama im criminal",
      duration: "4:50",
      trackNumber: 13,
      album: britniAlbum1._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "mama im criminal",
      duration: "4:50",
      trackNumber: 14,
      album: britniAlbum1._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "mama im criminal",
      duration: "4:50",
      trackNumber: 15,
      album: britniAlbum1._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "give me more",
      duration: "2:50",
      trackNumber: 16,
      album: britniAlbum2._id,
      isPublished: true,
      user_id: admin._id
    },
    {
      name: "give me more",
      duration: "2:50",
      trackNumber: 17,
      album: britniAlbum2._id,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "give me more",
      duration: "2:50",
      trackNumber: 18,
      album: britniAlbum2._id,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "give me more",
      duration: "2:50",
      trackNumber: 19,
      album: britniAlbum2._id,
      isPublished: true,
      user_id: user._id
    },
    {
      name: "give me more",
      duration: "2:50",
      trackNumber: 20,
      album: britniAlbum2._id,
      isPublished: true,
      user_id: admin._id
    },

    {
      name: "group of blood",
      duration: "3:00",
      trackNumber: 21,
      album: star._id,
      isPublished: false,
      user_id: admin._id
    },
    {
      name: "group of blood",
      duration: "3:00",
      trackNumber: 22,
      album: star._id,
      isPublished: false,
      user_id: admin._id
    },
    {
      name: "group of blood",
      duration: "3:00",
      trackNumber: 23,
      album: star._id,
      isPublished: false,
      user_id: user._id
    },
  );

  if (!one || !two || !three) return;

  await TrackHistory.create(
    {user_id: admin.id, track_id: one.id, datetime: Date.now()},
    {user_id: admin.id, track_id: two.id, datetime: Date.now()},
    {user_id: user.id, track_id: three.id, datetime: Date.now()}
  );

  await db.close();
}

run().catch(err => console.error(err));