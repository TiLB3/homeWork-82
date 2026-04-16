import path from "node:path";

const rootPath = __dirname;

export const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: "mongodb://localhost/spotify-Timur",
  jwt_secret: process.env.JWT_SECRET || "...",
  client_secret: process.env.CLIENT_SECRET || "...",
  client_id: process.env.CLIENT_ID || "...",
}