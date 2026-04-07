import {Component} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {DropdownDirective} from './dropdown.directive';

@Component({
  template: '<div appDropdown>Test</div>'
})
class TestHostComponent {}

describe('DropdownDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownDirective, TestHostComponent]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    const directiveEl = fixture.debugElement.children[0];
    expect(directiveEl).toBeTruthy();
  });

  it('should toggle isOpen on click of the host element', () => {
    const directiveEl = fixture.debugElement.children[0];
    directiveEl.nativeElement.click();
    fixture.detectChanges();
    expect(directiveEl.nativeElement.classList.contains('open')).toBe(true);
  });

  it('should close on click outside', () => {
    const directiveEl = fixture.debugElement.children[0];
    directiveEl.nativeElement.click();
    fixture.detectChanges();
    expect(directiveEl.nativeElement.classList.contains('open')).toBe(true);

    document.body.click();
    fixture.detectChanges();
    expect(directiveEl.nativeElement.classList.contains('open')).toBe(false);
  });

  it('should toggle off on second click', () => {
    const directiveEl = fixture.debugElement.children[0];
    directiveEl.nativeElement.click();
    fixture.detectChanges();
    expect(directiveEl.nativeElement.classList.contains('open')).toBe(true);

    directiveEl.nativeElement.click();
    fixture.detectChanges();
    expect(directiveEl.nativeElement.classList.contains('open')).toBe(false);
  });
});
