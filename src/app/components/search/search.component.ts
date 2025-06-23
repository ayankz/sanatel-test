import { Component, OnInit } from "@angular/core";
import { SharedIconComponent } from "../shared-icon/shared-icon.component";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BookService } from "../../services/book.service";

@Component({
  selector: "app-search",
  imports: [SharedIconComponent, FormsModule, ReactiveFormsModule],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss",
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl("");

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.bookService.setSearchTerm(value ?? "");
      });
  }
}
