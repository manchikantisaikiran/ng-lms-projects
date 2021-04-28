import { Injectable } from '@angular/core';
import { List, Task } from './model';
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

  updateList(id: string, payload: Partial<List>) {
    return this.webReqService.patch(`lists/${id}`, payload)
  }

  updateTask(taskId: string, listId: string, payload: Partial<List>) {
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, payload);
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`)
  }

  deleteTask(taskId: string, listId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  isCompleted(task: Task) {
    return this.webReqService.patch(`lists/${task.listId}/tasks/${task._id}`, { completed: !task.completed })
  }

}
