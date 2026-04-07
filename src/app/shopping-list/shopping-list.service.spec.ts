import {ShoppingListService} from './shopping-list.service';
import {Ingredient} from '../shared/ingredient.model';

describe('ShoppingListService', () => {
  let service: ShoppingListService;

  beforeEach(() => {
    service = new ShoppingListService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty ingredients', () => {
    expect(service.ingredients).toEqual([]);
  });

  it('should add an ingredient', () => {
    service.addIngredient({name: 'Apple', amount: 5});
    expect(service.ingredients.length).toBe(1);
    expect(service.ingredients[0].name).toBe('Apple');
    expect(service.ingredients[0].amount).toBe(5);
  });

  it('should emit ingredient list when adding an ingredient', (done) => {
    service.ingredientListEmitter.subscribe((ingredients) => {
      expect(ingredients.length).toBe(1);
      expect(ingredients[0].name).toBe('Banana');
      done();
    });
    service.addIngredient({name: 'Banana', amount: 3});
  });

  it('should add multiple ingredients', () => {
    const ingredients = [new Ingredient('Salt', 1), new Ingredient('Pepper', 2)];
    service.addIngredients(ingredients);
    expect(service.ingredients.length).toBe(2);
  });

  it('should emit ingredient list when adding multiple ingredients', (done) => {
    const ingredients = [new Ingredient('Salt', 1), new Ingredient('Pepper', 2)];
    service.ingredientListEmitter.subscribe((list) => {
      expect(list.length).toBe(2);
      done();
    });
    service.addIngredients(ingredients);
  });

  it('should get an ingredient by index', () => {
    service.addIngredient({name: 'Apple', amount: 5});
    const ingredient = service.getIngredient(0);
    expect(ingredient.name).toBe('Apple');
    expect(ingredient.amount).toBe(5);
  });

  it('should update an ingredient at index', () => {
    service.addIngredient({name: 'Apple', amount: 5});
    const newIngredient = new Ingredient('Orange', 10);
    service.updateIngredient(0, newIngredient);
    expect(service.ingredients[0].name).toBe('Orange');
    expect(service.ingredients[0].amount).toBe(10);
  });

  it('should emit ingredient list when updating an ingredient', (done) => {
    service.addIngredient({name: 'Apple', amount: 5});
    const newIngredient = new Ingredient('Orange', 10);
    service.ingredientListEmitter.subscribe((ingredients) => {
      expect(ingredients[0].name).toBe('Orange');
      done();
    });
    service.updateIngredient(0, newIngredient);
  });

  it('should delete an ingredient at index', () => {
    service.addIngredient({name: 'Apple', amount: 5});
    service.addIngredient({name: 'Banana', amount: 3});
    service.deleteIngredient(0);
    expect(service.ingredients.length).toBe(1);
    expect(service.ingredients[0].name).toBe('Banana');
  });

  it('should emit ingredient list when deleting an ingredient', (done) => {
    service.addIngredient({name: 'Apple', amount: 5});
    service.addIngredient({name: 'Banana', amount: 3});
    service.ingredientListEmitter.subscribe((ingredients) => {
      expect(ingredients.length).toBe(1);
      done();
    });
    service.deleteIngredient(0);
  });
});
