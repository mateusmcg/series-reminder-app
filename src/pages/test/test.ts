import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { TraktTvProvider } from '../../providers/trakt-tv/trakt-tv';
import { GenreEnum, Genre } from "../../models/genre";
import { TrendingMovie } from "../../models/trending-movie";
import { Movie } from "../../models/movie";
import { Cast } from "../../models/cast";
import { Rating } from "../../models/rating";
import { MovieStats } from "../../models/movie-stats";
import { SearchTypeEnum, Search, SearchTypeIdEnum } from "../../models/search";

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  protected movieGenres: Genre[];
  protected showGenres: Genre[];
  protected trendingMovies: TrendingMovie[];
  protected popularMovies: Movie[];
  protected movie: Movie;
  protected cast: Cast[];
  protected rating: Rating;
  protected relatedMovies: Movie[];
  protected movieStats: MovieStats;
  protected search: Search[];
  protected searchItem: Search;

  constructor(private traktTv: TraktTvProvider) {
    this.traktTv.getGenres(GenreEnum.Movies).subscribe((movieGenres) => {
      console.log('Subscrito com os gêneros de filmes:');
      this.movieGenres = movieGenres;
    });

    this.traktTv.getGenres(GenreEnum.Shows).subscribe((showGenres) => {
      console.log('Subscrito com os gêneros de séries');
      this.showGenres = showGenres;
    });

    this.traktTv.getTrendingMovies().subscribe((trendingMovies) => {
      console.log('Subscrito com a lista de filmes quentes');
      this.trendingMovies = trendingMovies;
    });

    this.traktTv.getPopularMovies().subscribe((popularMovies) => {
      console.log('Subscrito com a lista de filmes populares');
      this.popularMovies = popularMovies;
    });

    this.traktTv.getMovie(1).subscribe((movie) => {
      console.log('Subscrito a um filme específico');
      this.movie = movie;
    });

    this.traktTv.getMovieCast(1).subscribe((cast) => {
      console.log('Subscrito ao elenco de um filme');
      this.cast = cast;
    });

    this.traktTv.getMovieRating(1).subscribe((rating) => {
      console.log('Subscrito à nota de um filme');
      this.rating = rating;
    });

    this.traktTv.getRelatedMovies(1).subscribe((relatedMovies) => {
      console.log('Subscrito ao filmes relacionados');
      this.relatedMovies = relatedMovies;
    });

    this.traktTv.getMovieStats(1).subscribe((stats) => {
      console.log('Subscrito aos stats do filme');
      this.movieStats = stats;
    });

    this.traktTv.search([SearchTypeEnum.Movie, SearchTypeEnum.Show], "mentalist").subscribe((search) => {
      console.log('Subscrito à busca', search);
      this.search = search;
    });

    this.traktTv.searchById(SearchTypeIdEnum.Trakt, 12601, SearchTypeEnum.Movie).subscribe((searchItem) => {
      console.log('Subscrito à busca', searchItem);
      this.searchItem = searchItem;
    });
  }

}
