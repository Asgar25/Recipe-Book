import { Injectable } from '@angular/core';
import {Recipe} from './recipe';
import {Ingredient} from '../ingredient';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [new Recipe('Pruttled', 'Best breakfast food ever!', 'https://dannwoellertthefoodetymologist.files.wordpress.com/2014/10/images.jpg', [new Ingredient('Pork', 2), new Ingredient('Beef', 1), new Ingredient('Oats', 1)]),
    new Recipe('Sauerkraut Balls', 'Meatball-sized fritter containing sauerkraut and ham', 'http://img.sndimg.com/food/image/upload/h_420,w_560,c_fit/v1/img/recipes/13/70/0/picqGwJLm.jpg', [new Ingredient('Ham', 3), new Ingredient('Sauerkraut', 1)])];
  constructor() { }

  getRecipes() {
    return this.recipes;
  }
}
