import {Injectable} from '@angular/core';
import {Ingredient} from "./ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientListEmitter = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [];
  startedEditing = new Subject<number>();

  constructor() {
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: { name: string, amount: number }) {
    this.ingredients.push(ingredient);
    this.ingredientListEmitter.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientListEmitter.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientListEmitter.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientListEmitter.next(this.ingredients.slice());
  }
}
