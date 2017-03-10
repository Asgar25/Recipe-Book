import { Routes } from '@angular/router';
import { RecipeStartComponent } from './recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuard } from '../auth/auth.guard';

/**
 * Sub-routes/paths just for "/recipes/".
 * - No path - /recipes
 * - New - /recipes/new
 * - Id - /recipes/0
 * - Edit - /recipes/0/edit
 */
export const RECIPE_ROUTES: Routes = [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent },
];
