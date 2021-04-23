import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoModel } from '../shared/todo-model';
import { TodoService } from '../shared/todo-service.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('todoItemAnim', [
      transition(':leave', [
        animate(200, style({
          opacity: 0,
          height: 0,
          marginBottom: 0,
        }))
      ])
    ])
  ]
})
export class TodosComponent implements OnInit {

  todos: TodoModel[] = [];

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos()
  }

  toggleCompleted(todo: TodoModel) {
    this.todoService.updateTodo(todo.id, { isCompleted: !todo.isCompleted });
  }

  onEditClick(todo: TodoModel) {
    this.router.navigate(['/todos', todo.id])
  }

  ondeleteClick(todo: TodoModel) {
    this.todoService.deleteTodo(todo.id);
  }

  trackById(index: number, item: TodoModel) {
    return item.id;
  }
}
