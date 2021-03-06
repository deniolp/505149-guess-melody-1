export enum Type {
  ARTIST = "artist",
  GENRE = "genre",
}

export interface Song {
  artist: string,
  src: string,
}

export interface AnswerArtist {
  artist: string,
  picture: string,
}

export interface QuestionArtist {
  answers: AnswerArtist[],
  song: Song,
  type: Type,
}

export interface AnswerGenre {
  src: string,
  genre: string,
}

export interface QuestionGenre {
  answers: AnswerGenre[],
  genre: string,
  type: Type,
}
