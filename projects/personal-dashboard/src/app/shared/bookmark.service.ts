import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: Bookmark[] = [];
  storageSubscription: Subscription;
  constructor() {
    this.loadState()
    this.storageSubscription = fromEvent(window, 'storage').subscribe((event: StorageEventInit) => {
      console.log(event)
      if (event.key === 'bookmarks') {
        this.loadState()
      }
    })
  }

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find(b => b.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
    this.saveState()
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id);
    Object.assign(bookmark, updatedFields);
    this.saveState()
  }

  deleetBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id);
    if (bookmarkIndex === -1) return;
    this.bookmarks.splice(bookmarkIndex, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      const bookmarksInstorageString = localStorage.getItem('bookmarks');

      if (!bookmarksInstorageString) return;
      const bookmarksInstorage = JSON.parse(bookmarksInstorageString, (key, value) => {
        if (key === 'url') return new URL(value);
        return value;
      });

      if (!bookmarksInstorage) return;
      this.bookmarks.length = 0; //clearing bookmarks array ny kepping reference
      this.bookmarks.push(...bookmarksInstorage)
    }
    catch (e) {
      console.log(e)
    }
  }

  ngOnDestroy() {
    this.storageSubscription.unsubscribe();
  }

}
