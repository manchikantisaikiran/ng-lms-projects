import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  listId!: string;

  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listId = params.listId;
    })
  }

  createTask(title: string) {
    this.taskService.createTask(title, this.listId)
      .subscribe(response => {
        console.log(response)
        this.router.navigate(['../'], { relativeTo: this.route })
      })
  }

  cancelClicked() {
    this.location.back();
  }

}
