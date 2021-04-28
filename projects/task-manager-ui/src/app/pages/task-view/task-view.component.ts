import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { List, Task } from '../../model'
import { LoginService } from '../../login.service';

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

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router, private loginService: LoginService) {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      console.log(userDetails.email.split('@'));

      [this.username] = userDetails.email.split('@');
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
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
      })
  }

  getLists() {
    this.taskService.getLists()
      .subscribe(lists => {
        this.lists = lists;
        console.log(lists);
      }, err => this.router.navigate(['/login']))
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

  onEdit() {
    console.log(this.lists)
    const activeList = this.lists.find(list => list._id === this.activeListId)
    if (activeList)
      this.router.navigate(['/edit-list', activeList._id, activeList.title])
  }

  onDeleteList() {
    this.taskService.deleteList(this.activeListId)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/lists']);
      })
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
        console.log(res);
        this.getTasks(this.activeListId);
      })
  }

  onLogout() {
    this.loginService.logoutUser()
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/'])
        localStorage.removeItem('userDetails')
        localStorage.removeItem('token');
      })
  }

}
