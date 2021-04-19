import { Injectable } from '@angular/core';
import { Note } from './note'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notesArray: Note[] = []
  noteToEdit!: Note;
  constructor() { }

  addNote(note: Note) {
    this.notesArray.push(note)
    console.log(this.notesArray)
  }

  getNotes() {
    // return this.notesArray
    return of(this.notesArray)
  }

  deleteNotes(note: Note) {
    // this.notesArray = this.notesArray.filter(noteobj => noteobj.id !== note.id)

    const indexOfNote = this.notesArray.findIndex(currentNote => currentNote.id === note.id)
    this.notesArray.splice(indexOfNote, 1)
  }

  trackNoteToEdit(note: Note) {
    this.noteToEdit = note;
  }

  getNoteToEdit() {
    return this.noteToEdit;
  }

  updateNote(note: Note) {
    // this.notesArray.map(noteObj => {
    //   if (noteObj.id === note.id) {
    //     noteObj.title = note.title;
    //     noteObj.description = note.description;
    //   }
    // });
    console.log(note)
    const noteIndex = this.notesArray.findIndex(noteObj => noteObj.id === note.id)
    console.log(noteIndex)
    const obj = this.notesArray[noteIndex]
    console.log(obj)
    obj.title = note.title
    obj.description = note.description
    console.log(this.notesArray)
  }

}
