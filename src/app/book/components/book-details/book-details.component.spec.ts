import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {BookDetailsComponent} from './book-details.component';
import {Book} from '../../model';

describe('BookDetailsComponent', function () {
  let testBook: Book;

  beforeEach(() => {
    testBook = {id: 1, author: 'Test', title: 'Test Title'};
  })

  describe('(class)', function () {
    it('gets notified on book after calling save()', function (done) {
      // 1. given
      const eventStub: any = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector(selector: string) {
            const value = selector === '#author' ? 'Updated Author' : 'Updated Title'
            return {value};
          }
        }
      };
      const component = new BookDetailsComponent();
      component.book = testBook;
      component.valueChange.subscribe(book => {
        // 3. then
        expect(eventStub.preventDefault).toHaveBeenCalled();
        expect(book).toBeTruthy();
        expect(book.id).toBe(testBook.id);
        expect(book.author).toBe('Updated Author');
        expect(book.title).toBe('Updated Title');
        done();
      })
      // 2. when
      component.save(eventStub);
    });
  });

  describe('(DOM)', function () {
    it('populates input book data into form fields', function () {
      // given
      TestBed.configureTestingModule({
        imports: [BookDetailsComponent]
      });
      const fixture = TestBed.createComponent(BookDetailsComponent);
      const component = fixture.componentInstance;
      const element = fixture.nativeElement as HTMLElement;
      // when
      component.book = testBook;
      fixture.detectChanges();
      // then
      const authorInput = element.querySelector<HTMLInputElement>('#author');
      expect(authorInput).not.toBeNull();
      expect(authorInput?.value).toBe(testBook.author);
    });

    it('gets notified on book after clicking save button', function () {
      // TODO :)
    })
  });
});
