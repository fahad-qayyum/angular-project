import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingListService} from './shopping-list.service';
import {Ingredient} from '../shared/ingredient.model';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StructuralDirective} from './structural.directive';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let shoppingListService: ShoppingListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingListComponent, StructuralDirective],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    shoppingListService = TestBed.get(ShoppingListService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty ingredients', () => {
    expect(component.ingredients).toEqual([]);
  });

  it('should update ingredients when service emits', () => {
    fixture.detectChanges();
    const ingredients = [new Ingredient('Apple', 5), new Ingredient('Banana', 3)];
    shoppingListService.ingredientListEmitter.next(ingredients);
    expect(component.ingredients).toEqual(ingredients);
  });

  it('should call startedEditing.next on onEditItem', () => {
    spyOn(shoppingListService.startedEditing, 'next');
    component.onEditItem(2);
    expect(shoppingListService.startedEditing.next).toHaveBeenCalledWith(2);
  });
});
