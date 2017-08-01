import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController, private appAuth: AuthProvider) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Usuário encontrado, redirecionando...', user);
        this.navCtrl.setRoot('TabsPage');
      } else {
        console.log('Usuário não encontrado.');
      }
    });
  }

  googleLogin(): void {
    this.appAuth.googleSignIn();
  }

}
