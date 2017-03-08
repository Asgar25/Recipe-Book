import { Component } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isCollapsed: boolean = true;

  constructor(private recipeService: RecipeService) { }

  /**
   * onStore - Saves all recipes to database. Uses RecipeService to 'put()' JSON data into the Firebase database. Logs all returned data and errors.
   */
  onStore() {
    this.recipeService.storeData().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }


  /**
   * onFetch - Gets all recipes from database. Uses RecipeService to 'get()' JSON data from the Firebase database. Logs all returned data and errors.
   */
  onFetch() {
    this.recipeService.fetchData();
  }


  /**
   * toggleCollapsed - Toggles the boolean property 'isCollapsed', which is used to add or remove the 'in' class to the nav-bar for collapsing
   */
  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
