import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import {Recipe} from '../recipe';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeIndex: number;
  selectedRecipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeSerivce: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        this.selectedRecipe = this.recipeSerivce.getRecipe(this.recipeIndex);
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addItemsToShoppingList() {
    this.shoppingListService.addItems(this.selectedRecipe.ingredients);
  }

  onEdit() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }

  onDelete() {
    if (confirm('Deletion cannot be undone, are you sure?')) {
      this.recipeSerivce.deleteRecipe(this.recipeIndex);
      // Reload list
      this.router.navigate(['/recipes']);
    }
  }
}
