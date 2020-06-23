import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  constructor() { }

  ngOnInit() {
  }

  listItem(listItem: {name: string, amount: number}){
    console.log("name is: " + listItem.name + ", Amount is: " + listItem.amount);
    this.ingredients.push(listItem);
  }
}
