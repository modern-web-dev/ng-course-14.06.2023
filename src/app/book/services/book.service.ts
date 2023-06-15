import {Book, BookProperties} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private idSeq = 0;

  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: this.idSeq++,
      author: 'Tom Hombergs',
      title: 'Get Your Hands Dirty On Clean Architecture'
    },
    {
      id: this.idSeq++,
      author: 'Victor Savkin',
      title: 'Angular Router'
    },
    {
      id: this.idSeq++,
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

  search(query: string): Observable<string[]> {
    return new Observable(subscriber => {
      const handle = setTimeout(function () {
        subscriber.next([
          `${query}-result-1`,
          `${query}-result-2`,
          `${query}-result-3`
        ]);
        subscriber.complete();
      }, 2000);

      return () => {
        clearTimeout(handle);
      }
    });
  }


  findOne(bookId: number): Observable<Book> {
    return new Observable(subscriber => {
      const currentBooks = this.booksSubject.value;
      const foundBook = currentBooks.find(book => book.id === bookId);
      if (foundBook) {
        subscriber.next(foundBook);
        subscriber.complete();
      } else {
        subscriber.error(`Book with ID ${bookId} not found!`);
      }
    });
  }

  createNew(bookProperties: BookProperties): Observable<Book> {
    return new Observable(subscriber => {
      const currentBooks = this.booksSubject.value;
      const newBook: Book = {id: this.idSeq++, ...bookProperties};
      this.booksSubject.next([...currentBooks, newBook]);
      subscriber.next(newBook);
      subscriber.complete();
    });
  }
}
