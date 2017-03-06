import { Component, OnChanges, Input } from '@angular/core';
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

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnChanges(changes) {
    if (changes.item.currentValue === null) {
      this.isAdd = true;
    } else {
      this.isAdd = false;
    }
  }

  onSubmit(ingredient: Ingredient) {
     const NEW_INGREDIENT: Ingredient = new Ingredient(ingredient.name, ingredient.amount, ingredient.units);
    if (!this.isAdd) {
      this.shoppingListService.editItem(this.item, NEW_INGREDIENT);
    } else {
      this.shoppingListService.addItem(NEW_INGREDIENT);
    }
  }

}
