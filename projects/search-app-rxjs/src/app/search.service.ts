import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of} from 'rxjs';
import { map } from 'rxjs/operators';

interface Response {
  total_count: number;
  incomplete_results: boolean;
  items: [];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  baseUrl = 'https://api.github.com/search/repositories';
  searchResults: any;

  constructor(private http: HttpClient) { }

  searchEntries(term: string) {
    if (term === '') {
      return of({ total_count: 0, incomplete_results: false, items: [] });
    } else {
      let params = { q: term };
      return this.http.get<Response>(this.baseUrl, { params })
        .pipe(map(res => {
          return this.searchResults = res;
        }))
    }
  }

  _searchEntries(term: string) {
    return this.searchEntries(term);
  }
}
