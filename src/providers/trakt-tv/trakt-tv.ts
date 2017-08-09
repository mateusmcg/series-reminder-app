import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { TRAKT_TV_CONFIGS } from './trakt-tv.config';
import { Genre, GenreEnum } from '../../models/genre';
import { TrendingMovie } from "../../models/trending-movie";
import { Movie } from "../../models/movie";
import { Cast } from "../../models/cast";
import { Rating } from "../../models/rating";
import { MovieStats } from "../../models/movie-stats";
import { SearchTypeEnum, Search, SearchTypeIdEnum } from "../../models/search";

/*
  Generated class for the TraktTvProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TraktTvProvider {

  private headers: Headers;
  private genreURI: string;
  private trendingURI: string;
  private popularURI: string;
  private movieURI: string;
  private searchURI: string;
  private searchByIdURI: string;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("trakt-api-key", TRAKT_TV_CONFIGS.clientId);
    this.headers.append("content-type", TRAKT_TV_CONFIGS.headers.contentType);
    this.headers.append("trakt-api-version", TRAKT_TV_CONFIGS.headers.traktApiVersion);

    this.genreURI = "genres/{type}";
    this.trendingURI = "{type}/trending";
    this.popularURI = "{type}/popular";
    this.movieURI = "movies/{id}";
    this.searchURI = "search/{type}?query={query}";
    this.searchByIdURI = "search/{id_type}/{id}?type={type}";
  }

  private handleError(error: Response | any) {
    console.log("Erro: ", error);
    return Observable.throw(error.json().error || "Server error.");
  }

  private extractData<T>(response: Response): T {
    return response.json() as T;
  }

  private logData(response: any) {
    console.log(response);
  }

  getGenres(type: GenreEnum): Observable<Genre[]> {
    var uri = this.genreURI.replace("{type}", GenreEnum[type].toString().toLowerCase());

    return this.http.get(`${TRAKT_TV_CONFIGS.baseURL}/${uri}`, { headers: this.headers })
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError);
  }

  getTrendingMovies(): Observable<TrendingMovie[]> {
    var uri = this.trendingURI.replace("{type}", "movies");

    return this.http.get(`${TRAKT_TV_CONFIGS.baseURL}/${uri}`, { headers: this.headers })
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError)
  }

  getPopularMovies(): Observable<Movie[]> {
    var uri = this.popularURI.replace("{type}", "movies");

    return this.http.get(`${TRAKT_TV_CONFIGS.baseURL}/${uri}`, { headers: this.headers })
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError)
  }

  getMovie(id: number): Observable<Movie> {
    var uri = this.movieURI.replace("{id}", id.toString());

    return this.http.get(`${TRAKT_TV_CONFIGS.baseURL}/${uri}`, { headers: this.headers })
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError)
  }

  getMovieCast(id: number): Observable<Cast[]> {
    var uri = this.movieURI.replace("{id}", id.toString());

    return this.http.get(`${TRAKT_TV_CONFIGS.baseURL}/${uri}/people`, { headers: this.headers })
      .do(this.logData)
      .map((response) => { return response.json().cast })
      .do(this.logData)
      .catch(this.handleError)
  }

  getMovieRating(id: number): Observable<Rating> {
    var uri = this.movieURI.replace("{id}", id.toString());

    return this.http.get(`${TRAKT_TV_CONFIGS.baseURL}/${uri}/ratings`, { headers: this.headers })
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError)
  }

  getRelatedMovies(id: number): Observable<Movie[]> {
    var uri = this.movieURI.replace("{id}", id.toString());

    return this.http.get(`${TRAKT_TV_CONFIGS.baseURL}/${uri}/related`, { headers: this.headers })
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError)
  }

  getMovieStats(id: number): Observable<MovieStats> {
    var uri = this.movieURI.replace("{id}", id.toString());

    return this.http.get(`${TRAKT_TV_CONFIGS.baseURL}/${uri}/stats`, { headers: this.headers })
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError)
  }

  search(types: SearchTypeEnum[], query: string): Observable<Search[]> {
    var strTypes = types.map((type) => { return SearchTypeEnum[type].toString().toLowerCase() }).join(",");
    var uri = this.searchURI.replace("{type}", strTypes).replace("{query}", query);

    return this.http.get(`${TRAKT_TV_CONFIGS.baseURL}/${uri}`, { headers: this.headers })
      .do(this.logData)
      .map((searchResult) => {
        return searchResult.json().map((search) => {
          return new Search(search.type, search.score, (search.movie || search.show || search.person || search.episode || search.list));
        });
      }).do(this.logData)
      .catch(this.handleError);
  }

  searchById(idType: SearchTypeIdEnum, id: string | number, type: SearchTypeEnum): Observable<Search> {
    var uri = this.searchByIdURI.replace("{id_type}", SearchTypeIdEnum[idType].toString().toLowerCase()).replace("{id}", id.toString()).replace("{type}", SearchTypeEnum[type].toString().toLowerCase());

    return this.http.get(`${TRAKT_TV_CONFIGS.baseURL}/${uri}`, { headers: this.headers })
      .do(this.logData)
      .map((response) => {
        var search = response.json()[0];
        return new Search(search.type, search.score, (search.movie || search.show || search.person || search.episode || search.list));
      })
      .do(this.logData)
      .catch(this.handleError)
  }

}
