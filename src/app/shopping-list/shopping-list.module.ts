import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {StructuralDirective} from "./structural.directive";


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
    StructuralDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        {path: 'shopping-list', component: ShoppingListComponent}
      ]
    )
  ]
})

export class ShoppingListModule {
}
