import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // Lazy loading the Recipes Component, make sure to remove Recipes module from app.module.ts
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module')
        .then(m => m.RecipesModule)
  },
  // Lazy loading the Shopping List Component, make sure to remove Shopping List module from app.module.ts
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module')
        .then(m => m.ShoppingListModule)
  },
  // Lazy loading the Auth Component, make sure to remove auth module from app.module.ts
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module')
        .then(m => m.AuthModule)
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
