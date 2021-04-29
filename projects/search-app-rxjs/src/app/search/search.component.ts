import { Component, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs'
import { map, distinctUntilChanged, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { SearchService } from '../search.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  loading!: boolean;
  searchTerm = new Subject();
  baseUrl = "https://api.github.com/search/repositories";
  searchResults: any;
  paginationElements: Array<any> = [];
  errorMessage: any;
  error: boolean = false;
  page: any;

  constructor(private searchService: SearchService) { }

  searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  search() {
    this.searchTerm
      .pipe(
        map((e: any) => {
          // console.log(e.target.value);
          return e.target.value
        }),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term => {
          this.loading = true;
          return this.searchService._searchEntries(term)
        }),
        catchError((e) => {
          console.log(e)
          this.loading = false;
          this.error = true;
          this.errorMessage = e.error.message;
          return throwError(e);
        }),
      ).subscribe((v) => {
        this.loading = false;
        this.searchResults = v.items;
        this.paginationElements = this.searchResults;
        if (!this.paginationElements.length) this.errorMessage = 'No Results Found!'
      })
  }

  ngOnInit(): void {
    this.search()
  }

}
