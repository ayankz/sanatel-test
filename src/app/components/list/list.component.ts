import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IBook } from "../../types/book";
import { SharedIconComponent } from "../shared-icon/shared-icon.component";
import { ModalService } from "../../services/modal.service";
import { BookService } from "../../services/book.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-list",
  imports: [CommonModule, SharedIconComponent],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
})
export class ListComponent implements OnInit {
  books$!: Observable<IBook[]>;
  constructor(
    private modalService: ModalService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks();
  }

  finishBook(event: Event, book: IBook) {
    const isChecked = (event.target as HTMLInputElement).checked;

    const updatedBook: IBook = {
      ...book,
      isFinished: isChecked,
    };

    this.bookService.updateBook(updatedBook);
  }
  onEdit(book: IBook) {
    this.modalService.open(true, book);
  }
  onDelete(book: IBook) {
    this.bookService.removeBook(book.id);
  }
}
