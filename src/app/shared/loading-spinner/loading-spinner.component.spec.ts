import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoadingSpinnerComponent} from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingSpinnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Loading... text', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.loader').textContent).toContain('Loading...');
  });
});
