import { Injectable } from '@angular/core';
import {Ingredient} from '../ingredient';

@Injectable()
export class ShoppingListService {
  private items: Ingredient[] = [];
  constructor() { }

  getItems(){
      return this.items;
  }

  addItems(items: Ingredient[]) {
      // Apply a push to all items in the passed array.
      // Push each into the private array
      Array.prototype.push.apply(this.items, items);
  }

  addItem(item: Ingredient) {
      this.items.push(item);
  }

  editItem(oldItem: Ingredient, newItem: Ingredient){
      this.items[this.items.indexOf(oldItem)] = newItem;
  }
}
