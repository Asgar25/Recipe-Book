import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Recipe} from './recipe';
import {Ingredient} from '../ingredient';
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [new Recipe('Pruttles', 'Best breakfast food ever, shown here with eggs and toast.  Popular for many generations in the Volga German population of Central Kansas.', 'https://dannwoellertthefoodetymologist.files.wordpress.com/2014/10/images.jpg', [new Ingredient('Pork', 2, 'lbs'),
    new Ingredient('Beef', 1, 'lbs'),
    new Ingredient('Oats', 1, 'cup')]),
    new Recipe('Sauerkraut Balls', 'Meatball-sized fritter containing sauerkraut and ham', 'http://img.sndimg.com/food/image/upload/h_420,w_560,c_fit/v1/img/recipes/13/70/0/picqGwJLm.jpg', [new Ingredient('Ham', 3, 'lbs'),
      new Ingredient('Sauerkraut', 1, 'cup')])];

  recipesChanged = new EventEmitter<Recipe[]>();

  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body: string = JSON.stringify(this.recipes);
    const headers: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    // Put = override old data in firebase.  Only 1 set of recipes
    // POST = Would keep creating new keys in recipes.
    return this.http.put('https://recipebook-6cec3.firebaseio.com/recipes.json', body, { headers: headers });
  }

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
