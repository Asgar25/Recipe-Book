import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  items: Ingredient[] = [];         // All Ingredients in the shopping list
  selectedItem: Ingredient = null;  // Currently selected Ingredient from the items array

  constructor(private shoppingListService: ShoppingListService) { }


  /**
   * ngOnInit - Use the shopping list Service to get all Ingredient items.
   *
   * @returns {void}
   */
  ngOnInit() {
    this.items = this.shoppingListService.getItems();
  }


  /**
   * onSelectItem - Sets the <input> tags to the selected list item. Allows editing and deleting.
   *
   * @param  {Ingredient} item Ingredient to populate <input> tags with on shopping list.
   * @returns {void}
   */
  onSelectItem(item: Ingredient) {
    this.selectedItem = item;
  }


  /**
   * onCleared - Clears the <input> tags to allow user to add a new shopping list item  
   *
   * @returns {void}
   */
  onCleared() {
    this.selectedItem = null;
  }
}
