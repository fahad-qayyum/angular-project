import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  recipeBtnClicked: boolean;
  shoppingListBtnClicked: boolean;

  btnClickedName(btnName : string){
    if (btnName === 'recipe'){
      this.recipeBtnClicked = true;
    }else{
      this.recipeBtnClicked = false;
    }
    if (btnName === 'shopping'){
      this.shoppingListBtnClicked = true;
    }else{
      this.shoppingListBtnClicked = false;

    }
  }
}
