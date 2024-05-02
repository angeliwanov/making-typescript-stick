export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export interface Comic extends DataEntity {
  issueNumber: number;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
  // comic: Comic;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (
    arg: DataEntityMap[K]
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (
    id: string
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
};

function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== "undefined";
}

export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
  };

  addSong(s: Song): Song {
    this.#data.song[s.id] = s;
    return s;
  }

  getAllSongs(): Song[] {
    return Object.keys(this.#data.song)
      .map((songKey) => this.#data.song[songKey])
      .filter(isDefined);
  }

  getSong(songKey: string): Song {
    const song = this.#data.song[songKey];
    if (!song) throw new Error(`Could not find song with id ${songKey}`);
    return song;
  }
  clearSongs(): void {}

  addMovie(m: Movie): Movie {
    this.#data.movie[m.id] = m;
    return m;
  }

  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movie)
      .map((MovieKey) => this.#data.movie[MovieKey])
      .filter(isDefined);
  }

  getMovie(MovieKey: string): Movie {
    const Movie = this.#data.movie[MovieKey];
    if (!Movie) throw new Error(`Could not find Movie with id ${MovieKey}`);
    return Movie;
  }
  clearMovies(): void {}
}

const ds = new DataStore();
