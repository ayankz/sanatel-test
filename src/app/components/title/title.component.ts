import { Component, OnInit } from "@angular/core";
import { TitleChangerService } from "../../services/title-changer.service";
import { AsyncPipe } from "@angular/common";
import { Observable } from "rxjs";

@Component({
  selector: "app-title",
  imports: [AsyncPipe],
  templateUrl: "./title.component.html",
  styleUrl: "./title.component.scss",
})
export class TitleComponent {
  constructor(private titleService: TitleChangerService) {}
  get title$(): Observable<string> {
    return this.titleService.title$;
  }
}
