import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
  }

  createList(title: string) {
    this.taskService.createList(title)
      .subscribe((response) => {
        this.router.navigate(['/lists', response._id]);
      }, (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      })
  }

  cancelClicked() {
    this.location.back();
  }

}
