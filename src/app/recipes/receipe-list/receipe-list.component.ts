import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit {

  @Output('recipeDetails') recipe = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Fish Salmon', 'Its taste great and is not that spicy but very healthy', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Salad', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolore eligendi enim fuga hic ipsa nostrum perferendis praesentium repudiandae sit? Dolores fugit inventore modi nostrum quas quibusdam ullam voluptas voluptates.', 'https://c0.wallpaperflare.com/preview/40/957/185/canada-calgary-food-healthy-eating.jpg')
  ]

  constructor() {
  }

  ngOnInit() {
  }

  onRecipeClick(recipe: Recipe) {
    this.recipe.emit(recipe);
  }

}
