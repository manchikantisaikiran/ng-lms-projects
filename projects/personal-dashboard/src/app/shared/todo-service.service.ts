import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { TodoModel } from './todo-model'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: TodoModel[] = [];
  storageSubscription: Subscription;
  constructor() {
    this.loadState()
    this.storageSubscription = fromEvent(window, 'storage').subscribe((event: StorageEventInit) => {
      console.log(event)
      if (event.key === 'todos') {
        this.loadState()
      }
    })
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo: TodoModel) {
    this.todos.push(todo);
    this.saveState();
  }

  updateTodo(id: string, updatedTodoFields: Partial<TodoModel>) {
    const todo = this.getTodo(id);
    Object.assign(todo, updatedTodoFields)
    this.saveState();
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return;
    this.todos.splice(index, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    try {
      const todosInstorageString = localStorage.getItem('todos');

      if (!todosInstorageString) return;
      const todosInstorage = JSON.parse(todosInstorageString);

      if (!todosInstorage) return;
      this.todos.length = 0; //clearing todos array ny kepping reference
      this.todos.push(...todosInstorage)
    }
    catch (e) {
      console.log(e)
    }
  }
}
