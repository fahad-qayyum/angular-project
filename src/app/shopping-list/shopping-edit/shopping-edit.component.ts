import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingredientName', {static: true}) ingredientName: ElementRef;
  @ViewChild('ingredientContent', {static: true}) ingredientContent: ElementRef;
  @Output() listItem = new EventEmitter<{ name: string, amount: number }>();

  constructor() {
  }

  ngOnInit() {
  }

  onClickAddBtn() {
    this.listItem.emit({name: this.ingredientName.nativeElement.value, amount: this.ingredientContent.nativeElement.value});
  }

}
