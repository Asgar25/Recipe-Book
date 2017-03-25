import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Recipe } from '../recipe';
import { Ingredient } from '../../ingredient';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];   // local copy of the array of recipes in the service.  Displayed in <ul>
  private subscription: Subscription;
  isAuthenticated: boolean = false;

  /**
   * constructor
   *
   * @param  {RecipeService} private recipeService Inject the Recipe Service
   * @returns {RecipeListComponent}
   */
  constructor(private recipeService: RecipeService, private authService: AuthService) {
    // Subscribe to auth changes (login/out) to set the Boolean property.
    // Used for stateful Header Nav
    this.subscription = this.authService.isAuthenticated().subscribe(
      authStatus => this.isAuthenticated = authStatus
    );
  }


  /**
   * ngOnInit - Initialize component by getting all recipes from the service and subscribe to any changes from Firebase
   */
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
  }

  /**
   * ngOnDestroy - Stops any memory leaks from the Router subscription
   *
   * @returns {void}
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
