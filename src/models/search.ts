import { Movie } from "./movie";
import { Show } from "./show";
import { Episode } from "./episode";
import { Person } from "./person";

export class Search {

    constructor(type: string, score: number, obj: Object) {
        this.type = type;
        this.score = score;
        this.obj = obj;
    }

    type: string;
    score: number;
    obj: Object;
    movie: Movie;
    show: Show;
    episode: Episode;
    person: Person;

    public getSearchObject() {
        switch (this.type) {
            case SearchTypeEnum[SearchTypeEnum.Movie].toString().toLowerCase(): {
                return this.obj as Movie;
            }
            case SearchTypeEnum[SearchTypeEnum.Show].toString().toLowerCase(): {
                return this.obj as Show;
            }
            case SearchTypeEnum[SearchTypeEnum.Episode].toString().toLowerCase(): {
                return this.obj as Episode;
            }
            case SearchTypeEnum[SearchTypeEnum.Person].toString().toLowerCase(): {
                return this.obj as Person;
            }
            default: {
                return null;
            }
        }
    }
}

export enum SearchTypeEnum {
    Movie = 1,
    Show = 2,
    Episode = 3,
    Person = 4,
    List = 5
}

export enum SearchTypeIdEnum {
    Trakt = 1,
    Imdb = 2,
    Tmdb = 3,
    Tvdb = 4,
    TvRage = 5
}

export enum SearchFieldsEnum {
    Title = 1,
    TagLine = 2,
    Overview = 3,
    People = 4,
    Translations = 5,
    Aliases = 6,
    Name = 7,
    Biography = 8,
    Description = 9
}