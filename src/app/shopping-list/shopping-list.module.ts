import {NgModule} from '@angular/core';
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {StructuralDirective} from "./structural.directive";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
    StructuralDirective,
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
        {path: '', component: ShoppingListComponent}
      ]
    )
  ]
})

export class ShoppingListModule {
}
