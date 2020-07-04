import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ReceipesComponent} from './recipes/receipes.component';
import {ReceipeListComponent} from './recipes/receipe-list/receipe-list.component';
import {ReceipeDetailsComponent} from './recipes/recipe-details/receipe-details.component';
import {ReceipeItemComponent} from './recipes/receipe-list/receipe-item/receipe-item.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AttributeDirectiveDirective} from './recipes/attribute-directive.directive';
import {StructuralDirectiveDirective} from './shopping-list/structural-directive.directive';
import {DropdownDirective} from './shared/dropdown.directive';
import {RecipeService} from "./shared/recipe.service";
import {ShoppingListService} from "./shared/shopping-list.service";
import {NotFoundComponent} from './not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReceipesComponent,
    ReceipeListComponent,
    ReceipeDetailsComponent,
    ReceipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    AttributeDirectiveDirective,
    StructuralDirectiveDirective,
    DropdownDirective,
    NotFoundComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],

  // This make sure our app only have one instance of RecipeService and ShoppingListService all through the app.

  providers: [RecipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
