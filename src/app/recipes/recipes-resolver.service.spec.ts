import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {RecipesResolverService} from './recipes-resolver.service';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from './recipe.service';
import {Recipe} from './recipe.model';
import {of} from 'rxjs';

describe('RecipesResolverService', () => {
  let resolver: RecipesResolverService;
  let dataStorageService: DataStorageService;
  let recipeService: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    resolver = TestBed.get(RecipesResolverService);
    dataStorageService = TestBed.get(DataStorageService);
    recipeService = TestBed.get(RecipeService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should fetch recipes if none are loaded', () => {
    const mockRecipes = [new Recipe('Test', 'Desc', 'http://img.com/img.png', [])];
    spyOn(recipeService, 'getRecipes').and.returnValue([]);
    spyOn(dataStorageService, 'fetchRecipes').and.returnValue(of(mockRecipes));

    const result = resolver.resolve(null, null);
    expect(dataStorageService.fetchRecipes).toHaveBeenCalled();
  });

  it('should return existing recipes if already loaded', () => {
    const mockRecipes = [new Recipe('Test', 'Desc', 'http://img.com/img.png', [])];
    spyOn(recipeService, 'getRecipes').and.returnValue(mockRecipes);

    const result = resolver.resolve(null, null);
    expect(result).toEqual(mockRecipes);
  });
});
