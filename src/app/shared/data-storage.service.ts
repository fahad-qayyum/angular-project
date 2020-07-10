import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "./recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    // put requests overwrite all the data that is there
    // you can return the request which is observable here and subscribe to it in the component if you are interested in the response
    this.http.put('https://ng-recipe-book-f2d73.firebaseio.com/recipes.json', recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>('https://ng-recipe-book-f2d73.firebaseio.com/recipes.json').pipe(
      map((recipes) => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))
  }
}
