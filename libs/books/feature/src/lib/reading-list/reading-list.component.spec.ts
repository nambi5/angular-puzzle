import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';
import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { addToReadingList, ReadingListBook } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let snackbar: MatSnackBar;
  let store: Store;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        SharedTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    snackbar = TestBed.inject(MatSnackBar);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a snackbar when the remove icon is clicked', async(() => {
    const snackbaropen = spyOn(snackbar, 'open');
    component.openSnackBarOnAct = () => {};
    component.openSnackBar({} as ReadingListBook);
    expect(snackbaropen).toBeCalled();
  }));

  it('should trigger undo functionality on action button click ', async () => {
    const readingItem = {
      bookId: 'OPbkDwAAQBAJ',
      id: 'OPbkDwAAQBAJ',
      title: 'JavaScript: The Definitive Guide',
      authors: ['David Flanagan'],
      description: 'The overwhelming majority of websites use .',
      publisher: "O'Reilly Media",
      publishedDate: '2020-05-14T00:00:00.000Z',
      coverUrl:
        'http://books.google.com/books/content?id=OPbkDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      isAdded: false,
      finished: true,
      finishedDate: '2021-02-04T08:19:11.614Z',
    };
    component.openSnackBarOnAct(snackbar.open('test', 'undo'), readingItem);
    const spyTest = spyOn(store, 'dispatch');
    const buttonElement: HTMLElement = overlayContainerElement.querySelector(
      '.mat-simple-snackbar-action > button'
    );
    buttonElement.click();

    expect(spyTest).toHaveBeenCalledWith(
      addToReadingList({ book: readingItem })
    );
  });
});
