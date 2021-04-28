import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  value = '';
  activeListId!: string;
  activeTaskId!: string;

  constructor(private location: Location,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.value = params.title;
      this.activeListId = params.listId;
      this.activeTaskId = params.taskId;
    })
  }

  cancelClicked() {
    this.location.back();
  }

  editTask(title: string) {
    this.taskService.updateTask(this.activeTaskId, this.activeListId, { title })
      .subscribe(res => {
        console.log(res);
        //   // this.router.navigate([])
        this.location.back()
      })
  }

}
