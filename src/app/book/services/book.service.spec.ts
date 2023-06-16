import {TestBed} from '@angular/core/testing';
import {BACKED_URI, BookService} from "./book.service";
import {Book} from "../model";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";


describe('TestService', () => {
  let service: BookService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService, {provide: BACKED_URI, useValue: "http://localhost:3000"}],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BookService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should load all books', () => {
    const mockedBooks: Book[] = [{
      "id": 2,
      "title": "Lord of the Rings",
      "author": {
        "firstName": "J.R.R.",
        "lastName": "Tolkien"
      },
      "details": {
        "pages": 1178,
      },
    }];


    service.findAll().subscribe((serverBooks) => {
      expect(serverBooks).toBe(mockedBooks)
    })
    service.findAll().subscribe((serverBooks) => {
      expect(serverBooks.length).toBeFalsy()
    })
    const requests = testingController.match("http://localhost:3000/books");
    requests[0].flush(mockedBooks);
    requests[1].flush([])

    testingController.verify();

  });
});
