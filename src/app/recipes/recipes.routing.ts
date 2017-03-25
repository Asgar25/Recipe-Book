import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
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
const RECIPE_ROUTES: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent},
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]  },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]  }
    ]
  }

];

export const recipesRouting = RouterModule.forChild(RECIPE_ROUTES);
