import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBooks from '@tmo/books/data-access';
import * as fromReadingList from '@tmo/books/data-access';
import {
  BooksDataAccessModule,
  removeFromReadingList,
  updateBookFromReadingList,
} from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: Store;
  const book: ReadingListItem = {
    bookId: 'qU3rAgAAQBAJ',
    title: 'Speaking JavaScript',
    authors: ['Axel Rauschmayer'],
    description:
      'This concise book guides you into and through JavaScript',
    publisher: '"O\'Reilly Media, Inc."',
    publishedDate: '2014-02-25T00:00:00.000Z',
    coverUrl:
      'http://books.google.com/books/content?id=qU3rAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        SharedTestingModule,
        BooksDataAccessModule,
        BooksDataAccessModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should dispatch action to mark a book as reading finished', () => {
    
    const dispatchSpy = spyOn(store, 'dispatch');

    component.removeFromReadingList(book);

    expect(dispatchSpy).toHaveBeenCalledWith(
      removeFromReadingList({ item: book })
    );
  });

  it('it should dispatch action to mark a book as reading finished', () => {
    
    const dispatchSpy = spyOn(store, 'dispatch');

    component.markBookAsFinished(book);

    expect(dispatchSpy).toHaveBeenCalledWith(
      updateBookFromReadingList({ item: book })
    );
  });
});
