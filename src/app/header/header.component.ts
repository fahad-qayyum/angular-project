import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() btnClickedName = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  btnClicked(btnName: string) {
    this.btnClickedName.emit(btnName);
  }

}
