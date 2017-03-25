import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

declare var firebase: any;

@Injectable()
export class AuthService {
  provider = new firebase.auth.GoogleAuthProvider();
  displayName: string;
  photoUrl: string;
  email: string;

  constructor(private router: Router) { }


  /**
   * signIn - Login user to Firebase using Google OAuth
   *
   * @returns {void}
   */
  signIn() {
    //firebase.auth().signInWithRedirect(provider);  // Better for Mobile
    firebase.auth().signInWithPopup(this.provider).then(result => {
      if (result) {
        this.router.navigate(['/recipes']);
        //console.log(result);
        //console.log(result.user.displayName);
        //console.log(result.user.photoURL);
        // console.log(result.user.email);
        this.displayName = result.user.displayName;
        this.photoUrl = result.user.photoURL;
        this.email = result.user.email;
        var token, user;
        // The signed-in user info.
        user = result.user;
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          token = result.credential.accessToken;
        }
      }
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var errorEmail = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      alert('Unable to login with ' + errorEmail + '\n' + errorCode + ' - ' + errorMessage);
    });

  }



  /**
   * signOut - Logout user from Firebase using Google OAuth
   *
   * @returns {void}
   */
  signOut() {
    firebase.auth().signOut().then(() => this.router.navigate(['/'])).catch(function(error) {
      alert('Unable to logout\n' + error.code + ' - ' + error.message);
    });
  }




  /**
   *  isAuthenticated - Used to check if the user is signed in
   *
   *  @returns {Observable<boolean>} Indicates if the user is signed-in and validated.  true | false
   */
  isAuthenticated(): Observable<boolean> {
    const subject = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        return subject.next(true);
      } else {
        // No user is signed in.
        return subject.next(false);
      }
    });

    return subject.asObservable();
  }

}
