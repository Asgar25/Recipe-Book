import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HeaderComponent } from './header.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { DropdownDirective } from './dropdown.directive';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ShoppingListModule,
    routing
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    AuthService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
