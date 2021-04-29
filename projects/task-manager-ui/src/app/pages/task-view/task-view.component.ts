import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { List, Task } from '../../model'
import { LoginService } from '../../login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  lists!: List[];
  tasks?: Task[];
  activeListId!: string;
  username!: string;
  errorHandler = (err: HttpErrorResponse) => {
    if (err.status === 401) {
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
    }
  }

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router, private loginService: LoginService) {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      [this.username] = userDetails.email.split('@');
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.listId) {
        this.activeListId = params.listId;
        this.getTasks(params.listId);
      } else {
        this.tasks = undefined;
      }
    })
    this.getLists();
  }

  getTasks(id: string) {
    this.taskService.getTasks(id)
      .subscribe((tasks) => {
        this.tasks = tasks as Task[];
      }, this.errorHandler)
  }

  getLists() {
    this.taskService.getLists()
      .subscribe(lists => {
        this.lists = lists;
      }, this.errorHandler)
  }

  onTaskClick(task: Task) {
    this.taskService.isCompleted(task)
      .subscribe(response => {
        this.taskService.getTasks(task.listId)
          .subscribe(res => {
            this.tasks = res as Task[];
          }, this.errorHandler)
      }, this.errorHandler)
  }

  onEdit() {
    const activeList = this.lists.find(list => list._id === this.activeListId)
    if (activeList)
      this.router.navigate(['/edit-list', activeList._id, activeList.title])
  }

  onDeleteList() {
    this.taskService.deleteList(this.activeListId)
      .subscribe(res => {
        this.router.navigate(['/lists']);
      }, this.errorHandler)
  }

  onEditTask(taskId: string) {
    if (this.tasks) {
      const activeTask = this.tasks.find(task => task._id === taskId);
      if (activeTask)
        this.router.navigate(['edit-task', this.activeListId, taskId, activeTask.title])
    }
  }

  onDeleteTask(taskId: string) {
    this.taskService.deleteTask(taskId, this.activeListId)
      .subscribe(res => {
        this.getTasks(this.activeListId);
      }, this.errorHandler)
  }

  onLogout() {
    this.loginService.logoutUser()
      .subscribe(res => {
        this.router.navigate(['/'])
        localStorage.removeItem('userDetails')
        localStorage.removeItem('token');
      }, this.errorHandler)
  }

}
