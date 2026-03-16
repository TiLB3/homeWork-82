export interface IArtist {
  _id: string;
  name: string;
  photo: string | null;
  information: string | null;
}

export type ArtistWithoutId = Omit<IArtist, "_id">;