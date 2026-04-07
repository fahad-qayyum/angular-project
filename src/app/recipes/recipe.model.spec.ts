import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

describe('Recipe Model', () => {
  it('should create a recipe with all properties', () => {
    const ingredients = [new Ingredient('Salt', 1), new Ingredient('Pepper', 2)];
    const recipe = new Recipe('Test Recipe', 'A test description', 'http://image.com/img.png', ingredients);

    expect(recipe.name).toBe('Test Recipe');
    expect(recipe.description).toBe('A test description');
    expect(recipe.imagePath).toBe('http://image.com/img.png');
    expect(recipe.ingredients.length).toBe(2);
  });

  it('should create a recipe with empty ingredients', () => {
    const recipe = new Recipe('Empty Recipe', 'No ingredients', 'http://image.com/img.png', []);
    expect(recipe.ingredients).toEqual([]);
  });

  it('should allow updating recipe properties', () => {
    const recipe = new Recipe('Old Name', 'Old Desc', 'http://old.com/img.png', []);
    recipe.name = 'New Name';
    recipe.description = 'New Desc';
    expect(recipe.name).toBe('New Name');
    expect(recipe.description).toBe('New Desc');
  });
});
