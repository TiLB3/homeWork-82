export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface IArtist {
  _id: string;
  name: string;
  photo: string | null;
  information: string | null;
}

export interface IAlbum {
  _id: string;
  name: string;
  artist: IArtist;
  releaseDate: number;
  albumCover: string | null;
}

export interface ITrack {
  _id: string;
  name: string;
  album: IAlbum;
  duration: string;
  trackNumber: number;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

