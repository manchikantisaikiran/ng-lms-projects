import { Injectable } from '@angular/core';
import { Note } from './notes.model'

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: Note[] = [];
  constructor() { }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateNotes(id: string, updateFields: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note, updateFields);
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id);
    if (noteIndex == -1) return;
    this.notes.splice(noteIndex, 1);
  }
}
