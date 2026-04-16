import express from 'express'
import dotenv from 'dotenv';

dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import artistRouter from "./routes/artists";
import albumRouter from "./routes/albums";
import trackRouter from "./routes/tracks";
import usersRouter from "./routes/users";
import trackHistory from "./routes/trackHistories";
import {config} from "./config";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/artists", artistRouter);
app.use("/albums", albumRouter);
app.use("/tracks", trackRouter);
app.use("/track_history", trackHistory);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log("Server running on port " + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((err) => console.error(err));

