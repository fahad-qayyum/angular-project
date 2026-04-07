import {Component} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {AttributeDirective} from './attribute.directive';
import {By} from '@angular/platform-browser';

@Component({
  template: '<p attributeDirective [hoverColor]="\'red\'" [nonHoverColor]="\'blue\'">Test</p>'
})
class TestHostComponent {}

describe('AttributeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributeDirective, TestHostComponent]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    const directiveEl = fixture.debugElement.query(By.directive(AttributeDirective));
    expect(directiveEl).toBeTruthy();
  });

  it('should set the initial color to nonHoverColor', () => {
    const el = fixture.debugElement.query(By.css('p'));
    expect(el.nativeElement.style.color).toBe('blue');
  });

  it('should change color to hoverColor on mouseover', () => {
    const el = fixture.debugElement.query(By.css('p'));
    el.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(el.nativeElement.style.color).toBe('red');
  });

  it('should change color back to nonHoverColor on mouseout', () => {
    const el = fixture.debugElement.query(By.css('p'));
    el.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    el.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    expect(el.nativeElement.style.color).toBe('blue');
  });
});
