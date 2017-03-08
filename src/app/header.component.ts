import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onStore() {
    this.recipeService.storeData().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  onFetch() {
    this.recipeService.fetchData();
  }

  toggleCollapsed() {
      this.isCollapsed = !this.isCollapsed;
  }
}
