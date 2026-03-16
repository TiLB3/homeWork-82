import express from 'express'
import cors from "cors";
import mongoose from "mongoose";
import artistRouter from "./routes/artists";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use("/artists", artistRouter);

const run = async () => {
  await mongoose.connect('mongodb://localhost/spotify-Timur');

  app.listen(port, () => {
    console.log("Server running on port " + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((err) => console.error(err));

