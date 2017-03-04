import { Component, OnInit, Input } from '@angular/core';
import {Ingredient} from '../ingredient';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    @Input() items: Ingredient[]=[];
  constructor() { }

  ngOnInit() {
  }

}
