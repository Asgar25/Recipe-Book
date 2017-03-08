import { Injectable } from '@angular/core';
import {Ingredient} from '../ingredient';

@Injectable()
export class ShoppingListService {
  private items: Ingredient[] = []; // All items in the shopping list
  constructor() { }


  /**
   * getItems - Retuns an array of all Ingredients in the shopping list.
   *
   * @returns {Ingredient[]}  Array of Ingredients
   */
  getItems() {
    return this.items;
  }


  /**
   * addItems - Adds a list of Ingredients to the shopping list array
   *
   * @param  {Ingredient[]} items Array of Ingredients to add to the shopping list
   * @returns {void}
   */
  addItems(items: Ingredient[]) {
    // Apply a push to all items in the passed array.
    // Push each into the private array
    Array.prototype.push.apply(this.items, items);
  }


  /**
   * addItem - Adds an ingredient to the shopping list array
   *
   * @param  {Ingredient} item Single Ingredient to add to the shopping list
   * @returns {void}
   */
  addItem(item: Ingredient) {
    this.items.push(item);
  }


  /**
   * editItem - Modifies an existing Ingredient in the shopping list
   *
   * @param  {Ingredient} oldItem Existing Ingredient in the shopping list
   * @param  {Ingredient} newItem Updated Ingredient
   * @returns {void}
   */
  editItem(oldItem: Ingredient, newItem: Ingredient) {
    this.items[this.items.indexOf(oldItem)] = newItem;
  }


  /**
   * deleteItem - description
   *
   * @param  {Ingredient} item Ingredient to delete from the shopping list array
   * @returns {void} 
   */
  deleteItem(item: Ingredient) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
