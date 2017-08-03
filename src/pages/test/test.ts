import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TraktTvProvider } from '../../providers/trakt-tv/trakt-tv';
import { GenreEnum, Genre } from "../../models/genre";

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  protected movieGenres: Genre[];
  protected showGenres: Genre[];

  constructor(private traktTv: TraktTvProvider) {
    this.traktTv.getGenres(GenreEnum.Movies).subscribe((movieGenres) => {
      console.log('Subscrito com os gêneros de filmes:');
      this.movieGenres = movieGenres;
    });

    this.traktTv.getGenres(GenreEnum.Shows).subscribe((showGenres) => {
      console.log('Subscrito com os gêneros de séries');
      this.showGenres = showGenres;
    });
  }

}
