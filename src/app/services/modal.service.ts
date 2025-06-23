import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IBook } from "../types/book";
enum modalMode {
  EDIT = "edit",
  CREATE = "create",
}
@Injectable({
  providedIn: "root",
})
export class ModalService {
  private openModalSource = new BehaviorSubject<boolean>(false);
  private openModalModeSource = new BehaviorSubject<string>(modalMode.CREATE);
  private selectedBookSource = new BehaviorSubject<IBook | null>(null);
  isOpen$: Observable<boolean> = this.openModalSource.asObservable();
  currentMode$ = this.openModalModeSource.asObservable();
  selectedBook$ = this.selectedBookSource.asObservable();

  open(isEditMode?: boolean, book?: IBook) {
    if (isEditMode) {
      this.openModalModeSource.next(modalMode.EDIT);
    }
    if (book) {
      this.selectedBookSource.next(book);
    }
    this.openModalSource.next(true);
  }

  close() {
    this.openModalModeSource.next(modalMode.CREATE);
    this.selectedBookSource.next(null);
    this.openModalSource.next(false);
  }

  get currentMode(): string {
    return this.openModalModeSource.getValue();
  }
  get selectedBook(): IBook | null {
    return this.selectedBookSource.getValue();
  }
}
