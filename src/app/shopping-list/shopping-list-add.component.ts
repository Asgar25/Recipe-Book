import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements OnInit {
  isAdd: boolean = true;
  item: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onSubmit(ingredient: Ingredient) {
    if (!this.isAdd) {
      // Edit here
    } else {
      this.item = new Ingredient(ingredient.name, ingredient.amount, ingredient.units);
      this.shoppingListService.addItem(this.item);
    }
  }

}
