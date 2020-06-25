import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "./ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientListEmitter = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [];

  constructor() {
  }

  addIngredient(ingredient: { name: string, amount: number }) {
    this.ingredients.push(ingredient);
    this.ingredientListEmitter.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientListEmitter.emit(this.ingredients.slice());
  }
}
