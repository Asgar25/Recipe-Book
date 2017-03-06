import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements OnChanges {
  isAdd: boolean = true;
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnChanges(changes) {
    if (changes.item.currentValue === null) {
      this.isAdd = true;
      this.item = {name:null, amount: null, units:null};
    } else {
      this.isAdd = false;
    }
  }

  onSubmit(ingredient: Ingredient) {
    const NEW_INGREDIENT: Ingredient = new Ingredient(ingredient.name, ingredient.amount, ingredient.units);
    if (!this.isAdd) {
      this.shoppingListService.editItem(this.item, NEW_INGREDIENT);
      this.onClear()
    } else {
      this.shoppingListService.addItem(NEW_INGREDIENT);
    }
  }

  onDelete() {
    this.shoppingListService.deleteItem(this.item);
    this.onClear()
  }

  onClear() {
    this.isAdd = true;
    this.cleared.emit(true);
  }

}
