import { Component, OnInit } from "@angular/core";
import { SharedIconComponent } from "../shared-icon/shared-icon.component";
import { ModalService } from "../../services/modal.service";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonComponent } from "../button/button.component";
import { Observable, take } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";
import { IBook } from "../../types/book";
import { BookService } from "../../services/book.service";

@Component({
  selector: "app-modal-page",
  imports: [
    SharedIconComponent,
    ReactiveFormsModule,
    ButtonComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: "./modal-page.component.html",
  styleUrl: "./modal-page.component.scss",
})
export class ModalPageComponent implements OnInit {
  bookForm!: FormGroup;
  mode$!: Observable<string>;
  selectedBook$?: Observable<IBook | null>;
  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.mode$ = this.modalService.currentMode$;
    this.selectedBook$ = this.modalService.selectedBook$;
    this.selectedBook$.pipe(take(1)).subscribe((book) => {
      this.bookForm = this.fb.group({
        title: [book?.title || "", Validators.required],
        author: [book?.author || "", Validators.required],
        year: [
          book?.year || "",
          [
            Validators.required,
            Validators.min(1000),
            Validators.max(new Date().getFullYear()),
          ],
        ],
        pages: [book?.pages || "", [Validators.required, Validators.min(1)]],
      });
    });
  }
  closeModal() {
    this.modalService.close();
  }
  submitBook(): void {
    const mode = this.modalService.currentMode;
    const selectedBook = this.modalService.selectedBook;
    const formData = this.bookForm.value;

    if (mode === "edit" && selectedBook) {
      this.bookService.updateBook({ ...formData, id: selectedBook.id });
    } else {
      this.bookService.addBook({
        ...formData,
        id: Date.now(),
        isFinished: false,
        isRemoved: false,
      });
    }

    this.modalService.close();
    this.bookForm.reset();
  }
}
