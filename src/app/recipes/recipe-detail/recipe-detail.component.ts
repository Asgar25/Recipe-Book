import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeIndex: number;
  selectedRecipe: Recipe;
  private authSubscription: Subscription;
  isAuthenticated: boolean = false;

  // Inject the shopping list Service, recipe service, active route, and router
  constructor(private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeSerivce: RecipeService,
    private router: Router,
    private authService: AuthService) {
    // Subscribe to auth changes (login/out) to set the Boolean property.
    // Used for stateful Header Nav
    this.authSubscription = this.authService.isAuthenticated().subscribe(
      authStatus => this.isAuthenticated = authStatus
    );
  }


  /**
   * ngOnInit - Gets and assigns the recipde ID from the path.  Then gets the Recipe based on ID.
   *
   * @returns {void}
   */
  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        this.selectedRecipe = this.recipeSerivce.getRecipe(this.recipeIndex);
      }
    )
  }


  /**
   * ngOnDestroy - Stops any memory leaks from the Router subscription
   *
   * @returns {void}
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }


  /**
   * addItemsToShoppingList - Uses the Shopping List Service to add all recipe ingredients to the list.
   *
   * @returns {void}
   */
  addItemsToShoppingList() {
    this.shoppingListService.addItems(this.selectedRecipe.ingredients);
  }


  /**
   * onEdit - Handles the Edit click. Navigates to the recipe's edit page
   *
   * @returns {void}  description
   */
  onEdit() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }


  /**
   * onDelete - Handles the Delete click. Deletes the recipe from the array
   *
   * @returns {void}
   */
  onDelete() {
    if (confirm('Deletion cannot be undone, are you sure?') && this.isAuthenticated) {
      this.recipeSerivce.deleteRecipe(this.recipeIndex);
      // Reload list
      this.router.navigate(['/recipes']);
    }
  }


  /**
   * isAuthor - Determines if the current user created the selected recipe.  Used to allow CRUD
   *
   * @returns {boolean} true: if user is the one who created the selected recipe
   */
  isAuthor(): boolean {
    if (!this.isAuthenticated || !this.selectedRecipe) {
      return false;
    } else if (this.authService.email == this.selectedRecipe.authorEmail) {
      return true;
    }
  }
}
