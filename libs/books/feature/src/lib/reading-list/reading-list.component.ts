import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, ReadingListBook, removeFromReadingList } from '@tmo/books/data-access';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material/snack-bar';
import { Book } from '@tmo/shared/models';
@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,
    private snackBar: MatSnackBar) {}

  removeBookAndShowUndo(book:ReadingListBook){
    this.removeFromReadingList(book);
    this.openSnackBar(book);
  }
  
  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  openSnackBar(item: ReadingListBook) {
    const snackBarRef = this.snackBar.open('Removed from reading list', 'Undo');
    this.openSnackBarOnAct(snackBarRef, item);
  }

  openSnackBarOnAct(
    snackBarRef: MatSnackBarRef<SimpleSnackBar>,
    item: ReadingListBook
  ) {
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(
        addToReadingList({ book: item })
      );
    });
  }
}
