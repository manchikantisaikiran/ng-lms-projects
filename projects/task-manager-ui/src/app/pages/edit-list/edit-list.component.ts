import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  value = '';
  activeListId!: string;

  constructor(private location: Location,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.value = params.title;
      this.activeListId = params.id;
    })
  }

  cancelClicked() {
    this.location.back();
  }

  editList(title: string) {
    this.taskService.updateList(this.activeListId, { title })
      .subscribe(res => {
        // this.router.navigate([])
        this.location.back()
      }, (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      })
  }

}
