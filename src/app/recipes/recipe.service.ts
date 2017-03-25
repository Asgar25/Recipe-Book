import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';

import {Recipe} from './recipe';
import {Ingredient} from '../ingredient';


declare var firebase: any;

@Injectable()
export class RecipeService {
  // Array populated with default data, should Firebase connection not function
  private recipes: Recipe[] = [new Recipe('Pruttles', 'Best breakfast food ever, shown here with eggs and toast.  ' +
    'Popular for many generations in the Volga German population of Central Kansas. <br/><br/> ' +
    'Boil the meat in large kettle, with water to cover, until very done and meat falls from bones. ' +
    'Beef may be substituted for some of the pork, if desired.' +
    'Remove meat form broth, debone, and pick over for small bones.  Grind meat and set aside. ' +
    'Strain the broth and wash the kettle to prevent scorching.  Measure broth and return to kettle. ' +
    'Bring to boil and add oatmeal, stirring constantly.  Cook until oatmeal is done. Add ground meat to oatmeal mixture and mix well. ' +
    'Return to boiling, being careful that it does not stick to the kettle.  Add salt & pepper to taste.  Remove from heat.' +
    ' Pour into pans and let cool until firm.  May be cut into squares, wrapped and frozen, or left in the fridge for 1 week. <br/><br/> ' +
    'To serve, cut into slices and fry in skillet, no oil should be need if lean meat wasn\'t used. Brown the slices until crispy.' +
    'Syrup may be added while eating.', 'https://zgrauerholz.com/images/pruttles.jpg', [new Ingredient('Pork', 8, 'lbs, not lean\!'),
      new Ingredient('Broth', 8, 'qts.'),
      new Ingredient('Oats', 1, 'lg. bx. oatmeal')],
    'Zach Grauerholz',
    'https://lh3.googleusercontent.com/-4zYfsZXd_Lo/AAAAAAAAAAI/AAAAAAAAIxI/SjxY0asPGbk/photo.jpg',
    'zachary.grauerholz@gmail.com'),
    new Recipe('Rouladen', 'A German meat dish, usually consisting of bacon, onions, mustard and pickles wrapped in thinly ' +
      'sliced beef which is then cooked. <br/><br/> The meat should be cut into 4-6 thinly sliced portions in a regular shape. ' +
      'Pound each piece of meat with a mallet until thin. Place salt, pepper, mustard, bacon, and onion OR sauerkraut over each. ' +
      'Roll up and secure rolls with toothpicks or string.  Sauté in hot fat in skillet until well browned on all sides. ' +
      'Transfer to a casserole.  Add flour to the pan drippings, cook for a few seconds, then slowly add the beef broth. ' +
      'Simmer until thickened. Pour over meat in casserole.  Cover slightly. Simmer 1.5 hours at 350°, or until tender. ' +
      '', 'http://hostthetoast.com/wp-content/uploads/2013/04/Rouladen-110.jpg',
      [new Ingredient('Round Steak', 2, 'lbs.'),
        new Ingredient('Onion', 0.5, 'cup'),
        new Ingredient('Sauerkraut', 1, 'cup'),
        new Ingredient('Bacon', 4, 'slices'),
        new Ingredient('Mustard', 0.25, 'cup'),
        new Ingredient('Fat', 2, 'tbsp'),
        new Ingredient('Beef Broth', 2, 'cups'),
        new Ingredient('Flour', 3, 'tbsp')],
      'Zach Grauerholz',
      'https://lh3.googleusercontent.com/-4zYfsZXd_Lo/AAAAAAAAAAI/AAAAAAAAIxI/SjxY0asPGbk/photo.jpg',
      'zachary.grauerholz@gmail.com')];

  recipesChanged = new EventEmitter<Recipe[]>();    // Emits an array of Recipe objects from the Firebase Db

  constructor(private http: Http, private router: Router) { }


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
   * storeData - Depreciated.  Used before Firebase AuthService
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
   * saveData - Puts all recipes in the array into the Firebase database
   *
   * @returns {void}
   */
  saveData() {
    //const data: string = JSON.stringify(this.recipes);
    firebase.database().ref('recipes').set(this.recipes);
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
        this.router.navigate(['/recipes']);
      },
      error => console.log(error)
      );
  }
}
