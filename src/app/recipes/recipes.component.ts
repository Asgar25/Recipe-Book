import { Component } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  selector: 'rb-recipes',
  templateUrl: './recipes.component.html'
})
export class RecipesComponent {
  selectedRecipe: Recipe;   // Recipe to display in Recipe Detail component
  constructor() { }
}
