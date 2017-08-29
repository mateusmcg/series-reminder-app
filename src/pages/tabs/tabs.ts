import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: string;
  tab2Root: string;
  tab3Root: string;
  tab4Root: string;
  tab5Root: string;
  tab6Root: string;

  constructor() {
    this.tab1Root = 'MyShowsPage';
    this.tab2Root = 'MyMoviesPage';
    this.tab3Root = 'SearchPage'
    this.tab4Root = 'ProfilePage';
    this.tab5Root = 'SettingsPage';
    this.tab6Root = 'TestPage';
  }

}
