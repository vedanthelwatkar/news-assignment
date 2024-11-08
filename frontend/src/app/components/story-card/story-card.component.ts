import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Stories } from "../../models/Stories";
import { NgxPaginationModule } from "ngx-pagination";

@Component({
  selector: "app-story-card",
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: "./story-card.component.html",
  styleUrls: ["./story-card.component.scss"],
})
export class StoryCardComponent {
  @Input() stories: Stories[] = [];
  @Input() totalEntries: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 12;
  @Input() searchTerm: string = "";
  @Input() isLoading: boolean = true;
}
