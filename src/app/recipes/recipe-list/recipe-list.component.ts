import { Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe';
import {Ingredient} from '../../ingredient';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];   // local copy of the array of recipes in the service.  Displayed in <ul>

  /**
   * constructor
   *
   * @param  {RecipeService} private recipeService Inject the Recipe Service
   * @returns {RecipeListComponent}
   */
  constructor(private recipeService: RecipeService) { }


  /**
   * ngOnInit - Initialize component by getting all recipes from the service and subscribe to any changes from Firebase
   */
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
        (recipes: Recipe[]) => this.recipes = recipes
    );
  }
}
