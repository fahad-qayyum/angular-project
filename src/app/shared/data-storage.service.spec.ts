import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DataStorageService} from './data-storage.service';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {Ingredient} from './ingredient.model';

describe('DataStorageService', () => {
  let service: DataStorageService;
  let httpMock: HttpTestingController;
  let recipeService: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.get(DataStorageService);
    httpMock = TestBed.get(HttpTestingController);
    recipeService = TestBed.get(RecipeService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store recipes via PUT request', () => {
    const recipes = [new Recipe('Test', 'Desc', 'http://img.com/img.png', [])];
    spyOn(recipeService, 'getRecipes').and.returnValue(recipes);
    service.storeRecipes();

    const req = httpMock.expectOne('https://ng-recipe-book-f2d73.firebaseio.com/recipes.json');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(recipes);
    req.flush({});
  });

  it('should fetch recipes via GET request', () => {
    const mockRecipes = [
      {name: 'Test', description: 'Desc', imagePath: 'http://img.com/img.png', ingredients: []}
    ];
    spyOn(recipeService, 'setRecipes');

    service.fetchRecipes().subscribe((recipes) => {
      expect(recipes.length).toBe(1);
      expect(recipes[0].name).toBe('Test');
      expect(recipes[0].ingredients).toEqual([]);
    });

    const req = httpMock.expectOne('https://ng-recipe-book-f2d73.firebaseio.com/recipes.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockRecipes);
  });

  it('should set default empty ingredients array if recipe has no ingredients', () => {
    const mockRecipes = [
      {name: 'Test', description: 'Desc', imagePath: 'http://img.com/img.png'}
    ];
    spyOn(recipeService, 'setRecipes');

    service.fetchRecipes().subscribe((recipes) => {
      expect(recipes[0].ingredients).toEqual([]);
    });

    const req = httpMock.expectOne('https://ng-recipe-book-f2d73.firebaseio.com/recipes.json');
    req.flush(mockRecipes);
  });

  it('should call setRecipes on recipeService after fetching', () => {
    const mockRecipes = [
      {name: 'Test', description: 'Desc', imagePath: 'http://img.com/img.png', ingredients: []}
    ];
    spyOn(recipeService, 'setRecipes');

    service.fetchRecipes().subscribe();

    const req = httpMock.expectOne('https://ng-recipe-book-f2d73.firebaseio.com/recipes.json');
    req.flush(mockRecipes);
    expect(recipeService.setRecipes).toHaveBeenCalled();
  });
});
