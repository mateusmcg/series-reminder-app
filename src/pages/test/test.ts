import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { TraktTvProvider } from '../../providers/trakt-tv/trakt-tv';
import { GenreEnum, Genre } from "../../models/genre";
import { TrendingMovie } from "../../models/trending-movie";
import { Movie } from "../../models/movie";

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
  }

}
