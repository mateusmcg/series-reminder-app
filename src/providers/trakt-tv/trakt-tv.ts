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

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("trakt-api-key", TRAKT_TV_CONFIGS.clientId);
    this.headers.append("content-type", TRAKT_TV_CONFIGS.headers.contentType);
    this.headers.append("trakt-api-version", TRAKT_TV_CONFIGS.headers.traktApiVersion);

    this.genreURI = "genres/{type}";
    this.trendingURI = "{type}/trending";
    this.popularURI = "{type}/popular";
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

  private handleError(error: Response | any) {
    console.log("Erro: ", error);
    return Observable.throw(error.json().error || "Server error.");
  }

  private extractData(response: Response) {
    return response.json();
  }

  private logData(response: Response) {
    console.log(response);
  }

}
