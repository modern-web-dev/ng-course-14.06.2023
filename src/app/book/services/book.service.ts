import {Book} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: 0,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: 1,
      author: 'Tom Hombergs',
      title: 'Get Your Hands Dirty On Clean Architecture'
    },
    {
      id: 2,
      author: 'Victor Savkin',
      title: 'Angular Router'
    },
    {
      id: 3,
      author: 'Joshua Bloch',
      title: 'Java Effective Programming'
    }
  ]);

  findAll(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  updateBook(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const bookCopy = {...bookToUpdate};
      const currentBooks = this.booksSubject.value;
      const newBooks = currentBooks.map(book => book.id === bookToUpdate.id ? bookCopy : book);
      this.booksSubject.next(newBooks);
      subscriber.next(bookCopy);
      subscriber.complete();
    });
  }
}
