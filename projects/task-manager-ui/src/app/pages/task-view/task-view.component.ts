import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../task.service';
import { List, Task } from '../../model'

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  lists!: List[];
  tasks?: Task[];

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params.listId) {
        this.taskService.getTasks(params.listId)
          .subscribe((tasks) => {
            this.tasks = tasks as Task[];
          })
      } else {
        this.tasks = undefined;
      }
    })

    this.taskService.getLists()
      .subscribe(lists => {
        this.lists = lists;
        console.log(lists);
        
      })
  }

  onTaskClick(task: Task) {
    this.taskService.isCompleted(task)
      .subscribe(response => {
        console.log(response);
        this.taskService.getTasks(task.listId)
          .subscribe(res => {
            this.tasks = res as Task[];
          })
      })
  }

}
