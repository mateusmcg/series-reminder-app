export class Episode {
    ids: {
        trakt: number,
        tvdb: number,
        imdb: string,
        tmdb: number,
        tvrage: number
    };
    title: string;
    season: number;
    number: number;
}