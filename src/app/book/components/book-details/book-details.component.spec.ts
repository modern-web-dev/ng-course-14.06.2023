// import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
// import {BookDetailsComponent} from './book-details.component';
// import {Book} from '../../model';
//
// describe('BookDetailsComponent', function () {
//   const updatedAuthor = 'Updated Author';
//   const updatedTitle = 'Updated Title';
//   let testBook: Book;
//
//   beforeEach(() => {
//     testBook = {id: 1, author: 'Test', title: 'Test Title'};
//   })
//
//   describe('(class)', function () {
//     it('gets notified on book after calling save()', function (done) {
//       // 1. given
//       const eventStub: any = {
//         preventDefault: jasmine.createSpy('preventDefault'),
//         target: {
//           querySelector(selector: string) {
//             const value = selector === '#author' ? updatedAuthor : updatedTitle
//             return {value};
//           }
//         }
//       };
//       const component = new BookDetailsComponent();
//       component.book = testBook;
//       component.valueChange.subscribe(book => {
//         // 3. then
//         expect(eventStub.preventDefault).toHaveBeenCalled();
//         expect(book).toBeTruthy();
//         expect(book.id).toBe(testBook.id);
//         expect(book.author).toBe(updatedAuthor);
//         expect(book.title).toBe(updatedTitle);
//         done();
//       })
//       // 2. when
//       component.save(eventStub);
//     });
//   });
//
//   describe('(DOM)', function () {
//     let fixture: ComponentFixture<BookDetailsComponent>;
//     let component: BookDetailsComponent;
//     let element: HTMLElement;
//
//     beforeEach(() => {
//       return TestBed.configureTestingModule({
//         imports: [BookDetailsComponent]
//       }).compileComponents();
//     })
//
//     beforeEach(() => {
//       fixture = TestBed.createComponent(BookDetailsComponent);
//       component = fixture.componentInstance;
//       element = fixture.nativeElement as HTMLElement;
//     });
//
//     it('populates input book data into form fields', function () {
//       // when
//       component.book = testBook;
//       fixture.detectChanges();
//       // then
//       const authorInput = element.querySelector<HTMLInputElement>('#author');
//       expect(authorInput).not.toBeNull();
//       expect(authorInput?.value).toBe(testBook.author);
//     });
//
//     it('gets notified on book change after clicking save button', function () {
//       // 1. given
//       component.book = testBook;
//       fixture.detectChanges();
//       component.valueChange.subscribe(book => {
//         // 3. then
//         expect(book).toBeTruthy();
//         expect(book.id).toBe(testBook.id);
//         expect(book.author).toBe(updatedAuthor);
//         expect(book.title).toBe(updatedTitle);
//       })
//       // 2. when
//       createBookDetailsFrom(element)
//         .setAuthorInput(updatedAuthor)
//         .setTitleInput(updatedTitle)
//         .clickOnSave();
//     })
//   });
// });
//
// export function createBookDetailsFrom(element: HTMLElement) {
//   return {
//     setAuthorInput(newValue: string) {
//       getInputElementOf('#author').value = newValue;
//       return this;
//     },
//     setTitleInput(newValue: string) {
//       getInputElementOf('#title').value = newValue;
//       return this;
//     },
//     clickOnSave() {
//       const button = element.querySelector<HTMLButtonElement>('button');
//       if (!button) {
//         throw new Error('Button not found');
//       }
//       button.click();
//       return this;
//     }
//   }
//
//   function getInputElementOf(selector: string) {
//     const input = element.querySelector<HTMLInputElement>(selector);
//     if (!input) {
//       throw new Error(`No ${selector} input found!`);
//     }
//     return input;
//   }
// }
