import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TitleType } from "../types/title";

@Injectable({
  providedIn: "root",
})
export class TitleChangerService {
  private _title$ = new BehaviorSubject<string>(TitleType.ALL);
  constructor() {}
  get title$(): Observable<string> {
    return this._title$.asObservable();
  }

  setTitle(newTitle: string): void {
    this._title$.next(newTitle);
  }
}
