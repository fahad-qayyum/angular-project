import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[attributeDirective]'
})
export class AttributeDirective implements OnInit{

  @Input('hoverColor') hoverColor: string;
  @Input('nonHoverColor') nonHoverColor: string;

  // attribute.property
  @HostBinding('style.color') elementColor: string;

  re : Renderer2;
  constructor() { }

  ngOnInit(){
    this.elementColor = this.nonHoverColor;
  }

  @HostListener('mouseover') onMouseOver(){
    this.elementColor = this.hoverColor;
  }

  @HostListener('mouseout') onMouseOut(){
    this.elementColor = this.nonHoverColor;
  }

}
