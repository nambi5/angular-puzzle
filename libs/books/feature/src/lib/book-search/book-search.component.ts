import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  getBooksError,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  delaySearching$ = new Subject();
  searchForm = this.fb.group({
    term: '',
  });
  loadingError: string;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.triggerDelayedSearch();
    this.getAllbooks();
    this.getErrorMsg();
  }

  triggerDelayedSearch(): void {
    this.delaySearching$.pipe(debounceTime(500)).subscribe(() => {
      this.searchBooks();
    });
  }

  getAllbooks() {
    this.store.select(getAllBooks).subscribe((books) => {
      this.books = books;
    });
  }

  getErrorMsg() {
    this.store.select(getBooksError).subscribe((loadError) => {
      this.loadingError = loadError;
    });
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchTerm) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
