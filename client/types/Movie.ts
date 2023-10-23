export default interface Movie {
  countries: string[];
  description: string;
  genres: string[];
  name: string;
  rating: object[];
  year: string;
  __v: number;
  _id: string;
  poster: poster[];
}

interface poster {
  previewUrl: string;
  url: string;
}
