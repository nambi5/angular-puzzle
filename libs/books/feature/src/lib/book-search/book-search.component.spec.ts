import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('should trigger subject-delaySearching on new input event ',()=>{
    const inputField = fixture.debugElement.query(By.css('input[formControlName="term"]'));
    inputField.nativeElement.value = "test";
    const subjectNextEvent = spyOn(component.delaySearching$,'next');

    inputField.triggerEventHandler('input', { target: inputField.nativeElement });

    fixture.detectChanges();
    expect(subjectNextEvent).toHaveBeenCalled();
  })
  it('should call after searchBooks 500 millisecs', fakeAsync(()=> {
    const searchBoxSpy = spyOn(component,'searchBooks');
    component.triggerDelayedSearch();
    
    component.delaySearching$.next();

    expect(searchBoxSpy).not.toHaveBeenCalled();
    tick(500);
    expect(searchBoxSpy).toHaveBeenCalled();
  }))
});
