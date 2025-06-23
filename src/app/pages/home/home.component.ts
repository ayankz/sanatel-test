import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { SearchComponent } from "../../components/search/search.component";
import { TitleComponent } from "../../components/title/title.component";
import { ModalService } from "../../services/modal.service";
import { Observable } from "rxjs";
import { ModalPageComponent } from "../../components/modal-page/modal-page.component";
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: "app-home",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SidebarComponent,
    SearchComponent,
    TitleComponent,
    ModalPageComponent,
    ListComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  showModal = false;
  bookForm!: FormGroup;
  editIndex: number | null = null;
  isOpen$!: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.isOpen$ = this.modalService.isOpen$;
    this.bookForm = this.fb.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      year: [
        "",
        [
          Validators.required,
          Validators.min(1000),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      pages: ["", [Validators.required, Validators.min(1)]],
    });
  }

  closeModal() {
    this.showModal = false;
    this.bookForm.reset();
    this.editIndex = null;
  }

  editBook(index: number) {
    const book = this.books[index];

    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      year: book.year,
      pages: book.pages,
    });

    this.editIndex = index;
    this.showModal = true;
  }

  removeBook(index: number) {
    this.books.splice(index, 1);
  }

  submitBook() {
    if (this.bookForm.invalid) return;

    const formValue = this.bookForm.value;

    if (this.editIndex !== null) {
      this.books[this.editIndex] = formValue;
    } else {
      this.books.push(formValue);
    }

    this.closeModal();
  }
}
