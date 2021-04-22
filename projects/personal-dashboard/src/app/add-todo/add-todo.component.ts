import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoModel } from '../shared/todo-model';
import { TodoService } from '../shared/todo-service.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private todoService:TodoService,private router:Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(form:NgForm){
    if(form.invalid) return;
    const todo = new TodoModel(form.value.text,false)
    this.todoService.addTodo(todo)
    this.router.navigateByUrl('/todos')
  }

}
