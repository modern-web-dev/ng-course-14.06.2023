import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideBooks} from './book/book.config';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideBooks()],
    imports: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
