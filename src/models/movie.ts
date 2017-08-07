export class Movie {
    ids: {
        trakt: number,
        slug: string,
        imdb: string,
        tmdb: string
    };
    title: string;
    year: number;
}