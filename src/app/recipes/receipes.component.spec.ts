import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReceipesComponent} from './receipes.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ReceipesComponent', () => {
  let component: ReceipesComponent;
  let fixture: ComponentFixture<ReceipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceipesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
