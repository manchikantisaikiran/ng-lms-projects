import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Note, ShowData } from '../note'
import { NotesService } from '../notes.service';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() isDisplayAddForm!: boolean;
  @Output() cancelProcess = new EventEmitter<boolean>()
  isFormSubmitted:boolean = false;
  noteToEdit!: Note;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private notesService: NotesService) { }

  ngOnInit(): void {
    // this.notesService.getNotes().subscribe(note => this.notes = note)
  }

  ngOnChanges() {
    console.log(this.isDisplayAddForm)
    if (!this.isDisplayAddForm) {
      this.noteToEdit = this.notesService.getNoteToEdit();
      // this.form.value.title = this.noteToEdit.title;
      // this.form.value.description = this.noteToEdit.description;
      this.form.patchValue({
        title: this.noteToEdit.title,
        description: this.noteToEdit.description
      })
      console.log(this.form.value)
    }
  }

  addNote() {
    console.log(this.form)
    this.isFormSubmitted = true;
    if (this.form.status === 'INVALID') {
      return;
    }

    this.notesService.addNote({
      id: uuidv4(),
      title: this.form.value.title,
      description: this.form.value.description
    })
    this.cancelProcessFunc()
  }

  editNote() {
    this.isFormSubmitted = true;
    if (this.form.status === 'INVALID') {
      return;
    }
    this.notesService.updateNote({
      id: this.noteToEdit.id,
      title: this.form.value.title,
      description: this.form.value.description
    })
    this.cancelProcessFunc()
  }

  cancelProcessFunc() {
    this.isFormSubmitted = false;
    this.cancelProcess.emit(false)
  }

  get Helper() {
    return this.form.controls
  }

}
