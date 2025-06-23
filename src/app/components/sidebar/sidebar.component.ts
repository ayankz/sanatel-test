import { Component } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { SharedIconComponent } from "../shared-icon/shared-icon.component";
import { CommonModule } from "@angular/common";
import { TitleChangerService } from "../../services/title-changer.service";
import { IFilter } from "../../types/filter";
import { ModalService } from "../../services/modal.service";
import { TitleType } from "../../types/title";
@Component({
  selector: "app-sidebar",
  imports: [ButtonComponent, SharedIconComponent, CommonModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  constructor(
    public titleService: TitleChangerService,
    private ms: ModalService
  ) {}
  public filters: IFilter[] = [
    { title: TitleType.ALL, iconName: "list" },
    { title: TitleType.FINISHED, iconName: "done" },
    { title: TitleType.DELETED, iconName: "remove" },
  ];
  onChange = (title: string): void => this.titleService.setTitle(title);
  openModal() {
    this.ms.open();
  }
}
