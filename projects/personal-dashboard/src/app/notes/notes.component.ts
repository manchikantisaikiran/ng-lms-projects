import { Component, OnInit } from '@angular/core';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/notes.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes:Note[] = [];

  constructor(private notesService:NoteService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getNotes();
  }

  trackById(index: number, item: Note) {
    return item.id;
  }

}
