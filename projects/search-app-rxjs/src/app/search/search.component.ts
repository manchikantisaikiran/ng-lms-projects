import { Component, OnInit } from '@angular/core';
import { Subject, PartialObserver, throwError } from 'rxjs'
import { map, distinctUntilChanged, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { SearchService } from '../search.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'


interface Response {
  total_count: number;
  incomplete_results: boolean;
  items: [];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  public loading!: boolean;
  public searchTerm = new Subject();
  public baseUrl = "https://api.github.com/search/repositories";
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;
  public page: any;

  constructor(private searchService: SearchService) { }

  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  public search() {
    this.searchTerm
      .pipe(
        map((e: any) => {
          console.log(e.target.value);
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
          this.errorMessage = e.error.message;
          return throwError(e);
        }),
      ).subscribe((v) => {
        this.loading = false;
        this.searchResults = v.items;
        this.paginationElements = this.searchResults;
      })
  }

  ngOnInit(): void {
    this.search()
  }

}
