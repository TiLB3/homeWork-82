export interface IArtist {
  _id: string;
  name: string;
  photo: string | null;
  information: string | null;
  user_id: string;
}

export type ArtistWithoutId = Omit<IArtist, "_id">;

export interface IAlbum {
  _id: string;
  name: string;
  artist: string;
  releaseDate: number;
  albumCover: string | null;
  user_id: string;

}

export type AlbumWithoutId = Omit<IAlbum, "_id">;

export interface ITrack {
  _id: string;
  name: string;
  album: string;
  duration: string;
  user_id: string;
  trackNumber: number;
}

export type TrackWithoutId = Omit<ITrack, "_id">;

export interface UserField {
  username: string;
  password: string;
  token: string;
  role: string;
}

