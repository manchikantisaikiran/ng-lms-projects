import { Injectable } from '@angular/core';
import { Task } from './model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title: string) {
    return this.webReqService.post('lists', { title });
  }

  createTask(title: string, listId: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }

  getLists() {
    return this.webReqService.get('lists');
  }

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`)
  }

  isCompleted(task: Task) {
    return this.webReqService.patch(`lists/${task.listId}/tasks/${task._id}`, { completed: !task.completed })
  }

}