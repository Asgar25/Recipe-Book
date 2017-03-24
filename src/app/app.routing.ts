import { Routes, RouterModule } from '@angular/router';


/**
 * Main routes/paths defined for application.
 * - No path
 * - /recipes
 * - /shopping
 * - ** invalud paths
 */
const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'shopping', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
  { path: '**', redirectTo: '/recipes', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
