import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TodoModel } from '../shared/todo-model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: TodoModel;
  @Output() editClick: EventEmitter<void> = new EventEmitter()
  @Output() deleteClick: EventEmitter<void> = new EventEmitter()

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onEdit() {
    this.editClick.emit();
  }

  onDelete(){
    this.deleteClick.emit();
  }

}
