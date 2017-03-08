import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RECIPE_ROUTES } from './recipes/recipes.routes';


/**
 * Main routes/paths defined for application.
 * - No path
 * - /recipes
 * - /shopping
 * - ** invalud paths
 */
const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES },
  { path: 'shopping', component: ShoppingListComponent },
  { path: '**', redirectTo: '/recipes', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
