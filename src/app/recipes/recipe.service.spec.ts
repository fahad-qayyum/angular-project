import {TestBed} from '@angular/core/testing';
import {RecipeService} from './recipe.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

describe('RecipeService', () => {
  let service: RecipeService;
  let shoppingListService: ShoppingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(RecipeService);
    shoppingListService = TestBed.get(ShoppingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty recipes', () => {
    expect(service.getRecipes()).toEqual([]);
  });

  it('should add a recipe', () => {
    const recipe = new Recipe('Test', 'Desc', 'http://img.com/img.png', []);
    service.addRecipe(recipe);
    expect(service.getRecipes().length).toBe(1);
    expect(service.getRecipes()[0].name).toBe('Test');
  });

  it('should emit recipeChanged when adding a recipe', (done) => {
    const recipe = new Recipe('Test', 'Desc', 'http://img.com/img.png', []);
    service.recipeChanged.subscribe((recipes) => {
      expect(recipes.length).toBe(1);
      done();
    });
    service.addRecipe(recipe);
  });

  it('should get a recipe by index', () => {
    const recipe = new Recipe('Test', 'Desc', 'http://img.com/img.png', []);
    service.addRecipe(recipe);
    expect(service.getRecipe(0).name).toBe('Test');
  });

  it('should return a copy of recipes array from getRecipes', () => {
    const recipe = new Recipe('Test', 'Desc', 'http://img.com/img.png', []);
    service.addRecipe(recipe);
    const recipes = service.getRecipes();
    recipes.push(new Recipe('Another', 'Desc', 'http://img.com/img.png', []));
    expect(service.getRecipes().length).toBe(1);
  });

  it('should find a recipe by id', () => {
    const recipe = new Recipe('Test', 'Desc', 'http://img.com/img.png', []);
    service.addRecipe(recipe);
    expect(service.findRecipeById(0).name).toBe('Test');
  });

  it('should update a recipe at index', () => {
    const recipe = new Recipe('Old', 'Old Desc', 'http://old.com/img.png', []);
    service.addRecipe(recipe);
    const updated = new Recipe('New', 'New Desc', 'http://new.com/img.png', []);
    service.updateRecipe(0, updated);
    expect(service.getRecipe(0).name).toBe('New');
  });

  it('should emit recipeChanged when updating a recipe', (done) => {
    const recipe = new Recipe('Old', 'Old Desc', 'http://old.com/img.png', []);
    service.addRecipe(recipe);
    const updated = new Recipe('New', 'New Desc', 'http://new.com/img.png', []);
    service.recipeChanged.subscribe((recipes) => {
      expect(recipes[0].name).toBe('New');
      done();
    });
    service.updateRecipe(0, updated);
  });

  it('should set recipes', () => {
    const recipes = [
      new Recipe('R1', 'D1', 'http://img1.com/img.png', []),
      new Recipe('R2', 'D2', 'http://img2.com/img.png', [])
    ];
    service.setRecipes(recipes);
    expect(service.getRecipes().length).toBe(2);
  });

  it('should emit recipeChanged when setting recipes', (done) => {
    const recipes = [new Recipe('R1', 'D1', 'http://img1.com/img.png', [])];
    service.recipeChanged.subscribe((r) => {
      expect(r.length).toBe(1);
      done();
    });
    service.setRecipes(recipes);
  });

  it('should add ingredients to shopping list', () => {
    spyOn(shoppingListService, 'addIngredients');
    const ingredients = [new Ingredient('Salt', 1)];
    service.addIngredientsToShoppingList(ingredients);
    expect(shoppingListService.addIngredients).toHaveBeenCalledWith(ingredients);
  });
});
