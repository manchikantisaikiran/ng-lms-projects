import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.css']
})
export class AddBookmarkComponent implements OnInit {

  constructor(private bookmarkService:BookmarkService,
    private router:Router,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form:NgForm){
    if(form.invalid) return;
    const bookmark = new Bookmark(form.value.name,form.value.url);
    this.bookmarkService.addBookmark(bookmark);
    this.router.navigateByUrl('/bookmarks');
    this.notificationService.show('Created Bookmark');
  }



}
