import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/notes.model';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  note?: Note;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      const idParam = param.get('id')
      if (idParam) {
        this.note = this.noteService.getNote(idParam)
      }
    })
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value)
    if (this.note) {
      this.noteService.updateNotes(this.note.id, form.value)
      this.router.navigateByUrl('/notes')
    }
  }

  deleteNote() {
    if (this.note) {
      this.noteService.deleteNote(this.note.id)
      this.router.navigateByUrl('/notes')
    }

  }

}
