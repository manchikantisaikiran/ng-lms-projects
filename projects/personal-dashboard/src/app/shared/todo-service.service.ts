import { Injectable } from '@angular/core';
import { TodoModel } from './todo-model'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: TodoModel[] = [];

  constructor() { }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo: TodoModel) {
    this.todos.push(todo);
  }

  updateTodo(id: string, updatedTodoFields: Partial<TodoModel>) {
    const todo = this.getTodo(id);
    Object.assign(todo, updatedTodoFields)
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return;
    this.todos.splice(index, 1);
  }

}
