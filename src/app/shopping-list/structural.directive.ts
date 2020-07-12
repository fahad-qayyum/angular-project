import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appStructuralDirective]'
})
export class StructuralDirective {

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {
  }

  @Input() set appStructuralDirective(condition: boolean) {
    if (!condition) {
      this.vcRef.clear();
    } else {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

}
