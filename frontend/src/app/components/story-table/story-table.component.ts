import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { Stories } from "../../models/Stories";

@Component({
  selector: "app-story-table",
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: "./story-table.component.html",
  styleUrls: ["./story-table.component.scss"],
})
export class StoryTableComponent {
  @Input() stories: Stories[] = [];
  @Input() totalEntries: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 12;
  @Input() searchTerm: string = "";
  @Input() isLoading: boolean = true;
}
