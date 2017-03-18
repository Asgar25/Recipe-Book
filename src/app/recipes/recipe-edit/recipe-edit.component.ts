import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
    in;
  recipeForm: FormGroup;                // Main form for editing or adding recipes
  private subscription: Subscription;   // Subscribe to Router param changes.  Used to get Recipe ID
  private recipeIndex: number;          // ID of recipe location in recipes array
  private recipe: Recipe;               // The current Rcipe for the edit/new form
  private isNew: boolean = true;        //  Are we editing or adding

  // Inject the active route, custom Recipe Service, Form Builder, and Router
  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    // Subscribe to changes in route params.  Use to get current recipe ID
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {  // is there an ID in the Route params?
          this.isNew = false;
          this.recipeIndex = +params['id'];  // '+ converts string id to a number for index
          this.recipe = this.recipeService.getRecipe(this.recipeIndex); // Get the recipe based on index
        } else {
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();    // Initialize form fields based on isNew and recipe
      }
    )
  }

  // unsubscribe to stop memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  /**
   * private initForm - Initializes the FormGroup and controls with default recipe data & validators
   *
   * @returns {void}
   */
  private initForm() {
    // Default values for <input> tags
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDesc = '';
    let recipeIngredients: FormArray = new FormArray([]);

    // Populate form fields with existing recipe data.  Editing
    if (!this.isNew) {
      // Fixes issue when Firebase object doesn't contain any ingredient objects
      if (this.recipe.hasOwnProperty('ingredients')) {
        // Loop through all ingredients.  Adding more controls to the sub-FormGroup
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount, [Validators.required, Validators.pattern('^[0-9]+(?:\.[0-9]+)?$')]),
              units: new FormControl(this.recipe.ingredients[i].units, Validators.required)
            })
          );
        }
      }

      recipeName = this.recipe.name;
      recipeDesc = this.recipe.description;
      recipeImageUrl = this.recipe.imageUrl;
    }
    // Build the main FormGroup
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      description: [recipeDesc, Validators.required],
      imageUrl: [recipeImageUrl, [Validators.required, Validators.pattern('((http[s]?)?:\/\/.*\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF))')]],
      ingredients: recipeIngredients
    });
  }


  /**
   * onSubmit - Adds new recipes to the array or edits an existing one. Then navigates to the recipe detail page.
   *
   * @returns {void}
   */
  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }


  /**
   * onCancel - Navigates back to the recipe detail page.
   *
   * @returns {void}
   */
  onCancel() {
    this.navigateBack();
  }


  /**
   * onRemoveIngredient - Removes a specific Ingredient from the Recipe based on ID
   *
   * @param  {number} index Ingredient Id to remove from array within Recipe
   * @returns {void}
   */
  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }


  /**
   * onAddIngredient - Pushes a new Ingredient Form Control into the form when the '+' is clicked
   *
   * @param  {string} name: string   description
   * @param  {string} amount: string description
   * @param  {string} units: string  description
   * @returns {void}
   */
  onAddIngredient(name: string, amount: string, units: string) {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [Validators.required, Validators.pattern('\\d+')]),
        units: new FormControl(units, Validators.required)
      })
    );
  }


  /**
   * private navigateBack - navigates the browser to the current recipe's detail page, away from Edit/Add
   *
   * @returns {void}
   */
  private navigateBack() {
    this.router.navigate(['/recipes/' + this.route.snapshot.params['id']]);
  }

}
