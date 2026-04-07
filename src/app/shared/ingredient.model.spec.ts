import {Ingredient} from './ingredient.model';

describe('Ingredient Model', () => {
  it('should create an ingredient with name and amount', () => {
    const ingredient = new Ingredient('Apple', 5);
    expect(ingredient.name).toBe('Apple');
    expect(ingredient.amount).toBe(5);
  });

  it('should allow updating name', () => {
    const ingredient = new Ingredient('Apple', 5);
    ingredient.name = 'Banana';
    expect(ingredient.name).toBe('Banana');
  });

  it('should allow updating amount', () => {
    const ingredient = new Ingredient('Apple', 5);
    ingredient.amount = 10;
    expect(ingredient.amount).toBe(10);
  });
});
