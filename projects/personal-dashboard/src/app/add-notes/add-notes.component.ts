import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/notes.model';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {

  constructor(private noteService:NoteService,private router:Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(form:NgForm){
    // console.log(form);
    if(!form.valid) return;
    const note = new Note(form.value.title,form.value.content);
    this.noteService.addNote(note)
    this.router.navigate(['notes'])
  }

}
