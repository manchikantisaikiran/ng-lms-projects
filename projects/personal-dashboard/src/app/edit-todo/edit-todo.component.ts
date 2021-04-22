import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoModel } from '../shared/todo-model';
import { TodoService } from '../shared/todo-service.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  todo?: TodoModel;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const todoId = paramMap.get('id')
      if (todoId)
        this.todo = this.todoService.getTodo(todoId)
    })
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return;
    if (this.todo) {
      this.todoService.updateTodo(this.todo.id, form.value)
      this.router.navigateByUrl('/todos');
    }
  }

}
