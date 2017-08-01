import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserInfo } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  protected user: UserInfo = null;

  constructor(public navCtrl: NavController, private appAuth: AuthProvider) {
    this.user = this.appAuth.getUser();
  }

  logOut(): void {
    console.log('Saindo, aguarde...');

    this.appAuth.googleSignOut().then(() => {
      this.navCtrl.setRoot("LoginPage");
    }).catch((error) => {
      console.error('Erro ao deslogar', error);
      this.navCtrl.setRoot("LoginPage");
    });
  }

}
