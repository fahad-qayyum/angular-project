import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.shoppingListService.ingredientListEmitter
      .subscribe((ingredientList: Ingredient[]) => {
        this.ingredients = ingredientList;
      })
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
