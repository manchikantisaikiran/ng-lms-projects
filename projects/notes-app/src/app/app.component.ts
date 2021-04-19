import { Component } from '@angular/core';
import { ShowData } from './note'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes-app';

  // displayAddForm = false;
  // displayEditForm = false;
  displayForm = false;
  isDisplayAddForm = false;

  // showAddForm(e: boolean) {
  //   // console.log(e)
  //   this.displayAddForm = e;
  // }

  // showEditForm(e: boolean) {
  //   this.displayEditForm = e;
  // }

  showForm(e: ShowData) {
    this.displayForm = e.showForm;
    this.isDisplayAddForm = e.isAdd;
  }

  canelProcess(e:boolean){
    this.displayForm = e;
  }

}
