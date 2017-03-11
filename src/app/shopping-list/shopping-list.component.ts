import {
  Component,
  OnInit,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/core';
import { Ingredient } from '../ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]),
    transition('* => void', [
      animate(300, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
      ]))
    ])
  ])
]
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
