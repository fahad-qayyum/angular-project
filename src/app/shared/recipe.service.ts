import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "./ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Fish Salmon', 'Its taste great and is not that spicy but very healthy', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg', [new Ingredient('banana', 4), new Ingredient('apple', 5)]),
    new Recipe('Salad', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolore eligendi enim fuga hic ipsa nostrum perferendis praesentium repudiandae sit? Dolores fugit inventore modi nostrum quas quibusdam ullam voluptas voluptates.', 'https://c0.wallpaperflare.com/preview/40/957/185/canada-calgary-food-healthy-eating.jpg', [new Ingredient('cabbage', 4), new Ingredient('leafs', 50)])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    //slice is added to return the cop of the array
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
