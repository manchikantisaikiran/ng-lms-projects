import { not } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './notes.model'

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: Note[] = [];
  storageSubscription: Subscription;
  constructor() {
    this.loadState()
    this.storageSubscription = fromEvent(window, 'storage').subscribe((event: StorageEventInit) => {
      console.log(event)
      if (event.key === 'notes') {
        this.loadState()
      }

    })
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveState()
  }

  updateNotes(id: string, updateFields: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note, updateFields);
    this.saveState()
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id);
    if (noteIndex == -1) return;
    this.notes.splice(noteIndex, 1);
    this.saveState()
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      const notesInstorageString = localStorage.getItem('notes');

      if (!notesInstorageString) return;
      const notesInstorage = JSON.parse(notesInstorageString);

      if (!notesInstorage) return;
      // this.notes = notesInstorage;
      this.notes.length = 0; //clearing notes array ny kepping reference
      this.notes.push(...notesInstorage)
    }
    catch (e) {
      console.log(e)
    }
  }

  ngOnDestroy(){
    this.storageSubscription.unsubscribe();
  }
}
