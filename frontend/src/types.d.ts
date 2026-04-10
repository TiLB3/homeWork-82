export interface IUser {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface IArtist {
  _id: string;
  name: string;
  photo: string | null;
  information: string | null;
  isPublished: boolean;
  user_id: string;
}

export interface IArtistWithoutID {
  name: string;
  photo: File | null;
  information: string | null;
  user_id: string;
}

export interface IAlbum {
  _id: string;
  name: string;
  artist: IArtist;
  releaseDate: number;
  albumCover: string | null;
  isPublished: boolean;
  user_id: string;
}

export interface IAlbumWithoutID {
  name: string;
  artist: string;
  releaseDate: string;
  albumCover: File | null;
  user_id: string;
}

export interface ITrack {
  _id: string;
  name: string;
  album: IAlbum;
  duration: string;
  trackNumber: number;
  user_id: string;
  isPublished: boolean;
}

export interface ITrackWithoutID {
  name: string;
  album: string;
  duration: string;
  trackNumber: number;
  user_id: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface ITrackHistory {
  user_id: string;
  track_id: ITrack;
  datetime: Date;
  _id: string;
}



