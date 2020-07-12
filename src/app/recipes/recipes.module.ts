import {NgModule} from '@angular/core';
import {ReceipesComponent} from "./receipes.component";
import {ReceipeListComponent} from "./receipe-list/receipe-list.component";
import {ReceipeDetailsComponent} from "./recipe-details/receipe-details.component";
import {ReceipeItemComponent} from "./receipe-list/receipe-item/receipe-item.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {AttributeDirective} from "./attribute.directive";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AttributeDirective,
    ReceipesComponent,
    ReceipeListComponent,
    ReceipeDetailsComponent,
    ReceipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
//  we dont have to export the components because they are exposed via RecipesRoutingModule when we export RecipesModule
})
export class RecipesModule {
}
