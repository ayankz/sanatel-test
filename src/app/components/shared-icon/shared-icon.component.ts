import { Component, Input } from "@angular/core";

@Component({
  selector: "app-icon",
  imports: [],
  templateUrl: "./shared-icon.component.html",
  styleUrl: "./shared-icon.component.scss",
})
export class SharedIconComponent {
  @Input() name!: string;

  get iconUrl(): string {
    return `icons/${this.name}.svg`;
  }
}
