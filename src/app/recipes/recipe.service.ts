import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Recipe} from './recipe';
import {Ingredient} from '../ingredient';
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
    // Array populated with default data, should Firebase connection not function
  private recipes: Recipe[] = [new Recipe('Pruttles', 'Best breakfast food ever, shown here with eggs and toast.  Popular for many generations in the Volga German population of Central Kansas.', 'https://dannwoellertthefoodetymologist.files.wordpress.com/2014/10/images.jpg', [new Ingredient('Pork', 2, 'lbs'),
    new Ingredient('Beef', 1, 'lbs'),
    new Ingredient('Oats', 1, 'cup')]),
    new Recipe('Sauerkraut Balls', 'Meatball-sized fritter containing sauerkraut and ham', 'http://img.sndimg.com/food/image/upload/h_420,w_560,c_fit/v1/img/recipes/13/70/0/picqGwJLm.jpg', [new Ingredient('Ham', 3, 'lbs'),
      new Ingredient('Sauerkraut', 1, 'cup')])];

  recipesChanged = new EventEmitter<Recipe[]>();    // Emits an array of Recipe objects from the Firebase Db

  constructor(private http: Http) { }


  /**
   * getRecipes - Returns all recipes from the Service, which pulls them from the database.
   *
   * @returns {Recipe[]}  Array of all Recipe objects from the Recipe Service.
   */
  getRecipes(): Recipe[] {
    return this.recipes;
  }


  /**
   * getRecipe - Returns one recipe from the Service based on it's index in the recipes array.
   *
   * @param  {number} id index of recipe to get from the recipes array.
   * @returns {Recipe}  Specific Recipe object from the Recipe Service.
   */
  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }


  /**
   * deleteRecipe - Deletes a specific recipe from local data only
   *
   * @param  {number} id index of recipe to delete from the recipes array.
   */
  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
  }


  /**
   * addRecipe - Adds a new Recipe to local storage only (Service array).
   *
   * @param  {Recipe} newRecipe Recipe object to add to service array
   */
  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
  }


  /**
   * editRecipe - Modifies a specific recipe in local storage (servcie array).
   *
   * @param  {Recipe} oldRecipe Existing recipe object within the Service
   * @param  {Recipe} newRecipe: Modified recipe data
   */
  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }


  /**
   * storeData - Puts all recipes in the array into the Firebase database as JSON
   *
   * @returns {Observable<Response>}
   */
  storeData() {
    const body: string = JSON.stringify(this.recipes);
    const headers: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    // Put = override old data in firebase.  Only 1 set of recipes
    // POST = Would keep creating new keys in recipes.
    return this.http.put('https://recipebook-6cec3.firebaseio.com/recipes.json', body, { headers: headers });
  }


  /**
   * fetchData - USing an HTTP GET, pulls all recipe objects from Firebase Db.  Then it sets the recipes array to the returned data.
   */
  fetchData() {
    return this.http.get('https://recipebook-6cec3.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
      (data: Recipe[]) => {
        console.log(data);
        this.recipes = data;
        this.recipesChanged.emit(this.recipes);
      },
      error => console.log(error)
      );
  }
}
