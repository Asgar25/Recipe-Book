import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  isCollapsed: boolean = true;
  isAuthenticated: boolean = false;
  private subscription: Subscription;


  constructor(private recipeService: RecipeService, private authService: AuthService) {
    // Subscribe to auth changes (login/out) to set the Boolean property.
    // Used for stateful Header Nav
    this.subscription = this.authService.isAuthenticated().subscribe(
      authStatus => this.isAuthenticated = authStatus
    );
  }

  /**
   * onStore - Saves all recipes to database. Uses RecipeService to 'put()' JSON data into the Firebase database. Logs all returned data and errors.
   *
   * @returns {void}
   */
  onStore() {
    //this.recipeService.storeData().subscribe(
    //  data => console.log(data),
    //  error => console.log(error)
    //);
    if (this.isAuthenticated) {
        this.recipeService.saveData();
    }

  }


  /**
   * onFetch - Gets all recipes from database. Uses RecipeService to 'get()' JSON data from the Firebase database. Logs all returned data and errors.
   *
   * @returns {void}
   */
  onFetch() {
    this.recipeService.fetchData();
  }



  /**
   * onLogin - Login user to Firebase.
   *
   * @returns {void}
   */
  onLogin() {
    this.authService.signIn();
  }



  /**
   * onLogout - Logout user from Firebase
   *
   * @returns {void}
   */
  onLogout() {
    this.authService.signOut();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * toggleCollapsed - Toggles the boolean property 'isCollapsed', which is used to add or remove the 'in' class to the nav-bar for collapsing
   *
   * @returns {void}
   */
  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
