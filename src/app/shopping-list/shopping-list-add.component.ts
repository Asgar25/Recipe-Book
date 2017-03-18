import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges {
  isAdd: boolean = true;    // Indicates if the user is editing or adding an item
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();   // Used to notify the shopp component to set the selectedItem to null

  constructor(private shoppingListService: ShoppingListService) { }

  /**
   * ngOnChanges - Detects changes and determines if the user is editing or adding a list item.
   *
   * @param  {any} changes
   * @returns {Void}
   */
  ngOnChanges(changes: any) {
    if (changes.item.currentValue === null) {
      this.isAdd = true;
      this.item = { name: null, amount: null, units: null };
    } else {
      this.isAdd = false;
    }
  }


  /**
   * onSubmit - Handles the submit event for the new shopping list item form.  Will either edit an item or add a new one to the list using the Shopping List Service.
   *
   * @param  {Ingredient} ingredient Either a new Ingredient to add, or edited values for an existing Ingredient
   * @returns {void}
   */
  onSubmit(ingredient: Ingredient) {
    const newIngredient: Ingredient = new Ingredient(ingredient.name, ingredient.amount, ingredient.units);
    // if this is not an Add, then edit the existing item using the Shopping List Service
    if (!this.isAdd) {
      this.shoppingListService.editItem(this.item, newIngredient);
      this.onClear()
    } else {
      this.shoppingListService.addItem(newIngredient);
    }
  }


  /**
   * onDelete - Deletes the currently selected item from the shopping list, then clears the form inputs.
   *
   * @returns {void}
   */
  onDelete() {
    this.shoppingListService.deleteItem(this.item);
    this.onClear()
  }


  /**
   * onClear - Notifies the ShoppingList to clear the current item, which will clear the values from form inputs.
   *
   * @returns {void}
   */
  onClear() {
    this.isAdd = true;
    this.cleared.emit(true);
  }

}
