## Code Review

### Code reusability can be better "this.searchForm.value.term" seems to be used in multiple places.
### Could split book-search component with book-item as child component and book-grid as parent
### Implementation of Facade pattern for ngrx store
### Could show API load fail scenario in front end to improve user experience
### Could use date pipe with locale formatting instead of core javascript date formatting function 
### In reading-list-reducer Writting 'removeOne' functionality inside ConfirmRemoveFromReadingList instead of removeFromReadingList would be better (incase of api failure infront end it would be removed,backend will not :D ) 
### Spec files didn't catch all working scenario.


## Accessibility
---------------

### Automated-Scan

#### Background and foreground colors do not have a sufficient contrast ratio.
#### search icon do not have an aria label name

### Manual Check

#### Missing aria-label in reading list close button
#### Tab Index issue with "Example text to search"
#### Search on Enter/space - key is missing for example search(javascript)
#### Screen reader not reading book title on keyboard navigation
    
