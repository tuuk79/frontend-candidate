import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Person } from '../models/person';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searchResults: Person[] = [];
  noResultsMessage: string;

  constructor() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      color: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.noResultsMessage = '';
  }

  onSubmit(): void {
    this.search(this.searchForm);
  }

  async search(searchForm: FormGroup): Promise<void> {
    const url = `http://localhost:5000/search?term=${searchForm.value.search}&color=${searchForm.value.color}`;

    try {
      const response = await fetch(url);
      const results = await response.json();
      this.searchResults = results.matches;
      if (this.searchResults.length === 0) {
        this.noResultsMessage = 'No results found';
      }
    } catch (error) {
      // TODO: log to logging service
      this.noResultsMessage =
        'There was a problem retrieving search results. Please try again later.';
    }
  }
}
