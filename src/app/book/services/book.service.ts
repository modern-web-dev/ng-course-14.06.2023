import {Book, BookProperties} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";

export const BACKED_URI = new InjectionToken<string>("BACKED_URI")

@Injectable()
export class BookService {

  constructor(private readonly httpClient: HttpClient, @Inject(BACKED_URI) private readonly apiPAth: string) {
  }

  findAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.apiPAth}/books`);
  }

  updateBook(bookToUpdate: Book): Observable<Book> {

    return this.httpClient.put<Book>(`${this.apiPAth}/books/${bookToUpdate.id}`, bookToUpdate);
  }

  search(authorQuery: string): Observable<Book[]> {
    const params = new HttpParams({fromObject: {author_like: authorQuery}});
    return this.httpClient.get<Book[]>(`${this.apiPAth}/books`, {params});
  }


  findOne(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.apiPAth}/books/${bookId}`);
  }

  createNew(bookProperties: BookProperties): Observable<Book> {

    return this.httpClient.post<Book>(`${this.apiPAth}/books`, bookProperties);

  }
}
