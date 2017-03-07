import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  private subscription: Subscription;
  private recipeIndex: number;
  private recipe: Recipe;
  private isNew: boolean = true;

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
          this.recipeIndex = +params['id'];  // + converts string id to a number for index
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        } else {
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDesc = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (!this.isNew) {
      console.dir(this.recipe);
      for (let i = 0; i < this.recipe.ingredients.length; i++) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
            amount: new FormControl(this.recipe.ingredients[i].amount, [Validators.required, Validators.pattern('\\d+')]),
            units: new FormControl(this.recipe.ingredients[i].units, Validators.required)
          })
        );
      }
      recipeName = this.recipe.name;
      recipeDesc = this.recipe.description;
      recipeImageUrl = this.recipe.imageUrl;
    }
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      description: [recipeDesc, Validators.required],
      imageUrl: [recipeImageUrl, [Validators.required, Validators.pattern('((http[s]?)?:\/\/.*\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF))')]],
      ingredients: recipeIngredients
    });
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }

  onRemoveIngredient(index: number) {
      (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  onAddIngredient(name: string, amount: string, units: string) {
      (<FormArray>this.recipeForm.controls['ingredients']).push(
          new FormGroup({
            name: new FormControl(name, Validators.required),
            amount: new FormControl(amount, [Validators.required, Validators.pattern('\\d+')]),
            units: new FormControl(units, Validators.required)
          })
      );
  }

  private navigateBack() {
    this.router.navigate(['/recipes/' + this.route.snapshot.params['id']]);
  }

}
