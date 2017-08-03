import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private googleProvider = null;

  constructor(private platform: Platform) {
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  onAuthChanged(): void {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Usuário encontrado, redirecionando...', user);
      } else {
        console.log('Usuário não encontrado, redirecionando para o Login...');
      }
    });
  }

  googleSignIn(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      return firebase.auth().signInWithRedirect(this.googleProvider);
    } else {
      return firebase.auth().signInWithPopup(this.googleProvider);
    }
  }

  googleSignOut(): firebase.Promise<any> {
    return firebase.auth().signOut();
  }

  getUser(): firebase.UserInfo | null {
    return firebase.auth().currentUser.providerData[0];
  }

}
