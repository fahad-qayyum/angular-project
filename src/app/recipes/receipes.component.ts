import { Component, OnInit } from '@angular/core';
import {Recipe} from "./recipe.model";

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.css']
})
export class ReceipesComponent implements OnInit {

  recipe: Recipe;
  constructor() { }

  ngOnInit() {
  }

  recipeDetails(recipe : Recipe){
    this.recipe = recipe;
  }
}
