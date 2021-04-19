import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Note, ShowData } from '../note'
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  animations: [
    trigger('openClose', [
      transition(':leave', [
        style({
          opacity: 1,
          transform: "scale(1)",
          height: '*'
        })
        , animate(200, style({
          opacity: 0,
          transform: "scale(0)",
          height: '0px',
        }))
      ]),
      // transition(':enter', [

      //   style({
      //     opacity: 0,
      //     transform: "scale(0)",
      //     height: '0px',
      //   }),
      //   animate(200, style({
      //     opacity: 1,
      //     transform: "scale(1)",
      //     height: '*'
      //   })
      //   )
      // ]),
    ]),
    trigger('staggerAnim', [
      transition(':enter', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('200ms ease', style({
              opacity: 1,
              transform: "scale(1)",
              height: '*'
            })
            )
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})

export class NotesListComponent implements OnInit {
  // @Output() showAddForm = new EventEmitter()
  // @Output() showEditForm = new EventEmitter()
  notes: Note[] = [];
  @Output() showForm = new EventEmitter<ShowData>()
  filteredNotes: Note[] = []

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.getNotes().subscribe(note => {
      this.notes = note
      this.filteredNotes = note
    })

  }

  addNote() {
    // this.showAddForm.emit(true)
    this.showForm.emit({ isAdd: true, showForm: true })
  }

  editNote(note: Note) {
    // this.showEditForm.emit(true)
    this.notesService.trackNoteToEdit(note)
    this.showForm.emit({ isAdd: false, showForm: true })
  }

  deleteNote(note: Note) {
    this.notesService.deleteNotes(note)
    this.updateFilteredNotes()
  }

  // trackByItems(index: number, note: Note): string { return note.id; }

  filter(e: Event) {
    let input = (e.target as HTMLInputElement).value
    let query = input.toLowerCase().trim()
    let allResults: Note[] = []
    //split up the search query into individual words
    let terms: string[] = query.split(' ')
    //remove duplicate words
    let uniqueWords = this.removeDuplicates<string>(terms)
    //compile all relevant results into allresults array
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      allResults = [...allResults, ...results]
    })

    //allResults will include duplicate notes
    //so remove duplicates from allResults
    let uniqueResults = this.removeDuplicates<Note>(allResults)
    // if(typeof uniqueResults === 'Note'){
    // console.log(uniqueResults);

    this.filteredNotes = uniqueResults;
    // }

    //sort by relevanncy
    this.sortByRelevancy(allResults)
  }

  updateFilteredNotes() {
    this.filteredNotes = this.notes
  }

  removeDuplicates<T>(arr: T[]): T[] {
    // removeDuplicates(arr: string[] | Note[]): string[] | Note[] {
    let uniqueResults = new Set<any>(arr)
    //loop through the 
    return Array.from(uniqueResults)
  }

  relevantNotes(query: string): Note[] {
    query = query.toLowerCase().trim()
    let relevantNotes = this.notes.filter(note => {
      if (note.description.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })
    return relevantNotes;
  }

  sortByRelevancy(searchResults: Note[]) {
    let noteCountObject: { [key: string]: number } = {}

    searchResults.forEach(note => {
      let noteId = note.id
      if (noteCountObject[noteId]) {
        noteCountObject[noteId] += 1;
      } else {
        noteCountObject[noteId] = 1;
      }
    })

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = a.id;
      let bId = b.id;

      let aCount = noteCountObject[aId];
      let bCount = noteCountObject[bId];
      return bCount - aCount;

    })

  }
}
