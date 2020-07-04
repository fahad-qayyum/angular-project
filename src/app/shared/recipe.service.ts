import {Injectable} from '@angular/core';
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "./ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [
    new Recipe(1, 'Fish Salmon',
      'Its taste great and is not that spicy but very healthy',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [new Ingredient('banana', 4), new Ingredient('apple', 5)]),
    new Recipe(2, 'Salad',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolore eligendi enim fuga hic ipsa nostrum perferendis praesentium repudiandae sit? Dolores fugit inventore modi nostrum quas quibusdam ullam voluptas voluptates.',
      'https://feelgoodfoodie.net/wp-content/uploads/2019/02/Mediterranean-Chopped-Salad-5-500x375.jpg',
      [new Ingredient('cabbage', 4), new Ingredient('leafs', 50)])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    //slice is added to return the cop of the array
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  findRecipeById(id: number): Recipe {
    return this.recipes[id - 1];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index - 1, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
