import { Injectable } from "@angular/core";
import { IBook } from "../types/book";
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
} from "rxjs";
import { TitleChangerService } from "./title-changer.service";
import { TitleType } from "../types/title";

const STORAGE_KEY = "books";
@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(private titleService: TitleChangerService) {}
  private booksSubject = new BehaviorSubject<IBook[]>(this.loadBooks());
  private searchTermSubject = new BehaviorSubject<string>("");

  searchTerm$ = this.searchTermSubject.asObservable();
  public books$ = this.booksSubject.asObservable();

  private loadBooks(): IBook[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveBooks(books: IBook[] = this.booksSubject.value): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }
  getBooks(): Observable<IBook[]> {
    return combineLatest([
      this.books$,
      this.searchTerm$,
      this.titleService.title$,
    ]).pipe(
      map(([books, search, title]) => {
        const query = search.toLowerCase();

        return books.filter((book) => {
          const matchesSearch =
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query);

          if (title === TitleType.DELETED)
            return matchesSearch && book.isRemoved;
          if (title === TitleType.FINISHED)
            return matchesSearch && book.isFinished;
          return matchesSearch && !book.isRemoved;
        });
      })
    );
  }
  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  addBook(book: IBook): void {
    const updated = [...this.booksSubject.value, book];
    this.booksSubject.next(updated);
    this.saveBooks();
  }
  removeBook(id: number): void {
    const updated = this.booksSubject.value.map((book) =>
      book.id === id ? { ...book, isRemoved: true } : book
    );
    this.booksSubject.next(updated);
    this.saveBooks();
  }
  updateBook(updatedBook: IBook): void {
    const updated = this.booksSubject.value.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    this.booksSubject.next(updated);
    this.saveBooks();
  }
}
