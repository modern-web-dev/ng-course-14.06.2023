import {Book, BookProperties} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class BookService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`http://localhost:3000/books`);
  }

  updateBook(bookToUpdate: Book): Observable<Book> {

    return this.httpClient.put<Book>(`http://localhost:3000/books/${bookToUpdate.id}`, bookToUpdate);
  }

  search(authorQuery: string): Observable<Book[]> {
    const params = new HttpParams({fromObject: {author_like: authorQuery}});
    return this.httpClient.get<Book[]>(`http://localhost:3000/books`, {params});
  }


  findOne(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(`http://localhost:3000/books/${bookId}`);
  }

  createNew(bookProperties: BookProperties): Observable<Book> {

    return this.httpClient.post<Book>(`http://localhost:3000/books`, bookProperties);

  }
}
