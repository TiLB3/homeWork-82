export interface IArtist {
  _id: string;
  name: string;
  photo: string | null;
  information: string | null;
}

export type ArtistWithoutId = Omit<IArtist, "_id">;

export interface IAlbum {
  _id: string;
  name: string;
  artist: string;
  releaseDate: string;
  albumCover: string | null;
}

export type AlbumWithoutId = Omit<IAlbum, "_id">;