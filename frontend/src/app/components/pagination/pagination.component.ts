import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgxPaginationModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange = new EventEmitter<number>();
  @Output() searchTermChange = new EventEmitter<string>();

  searchTerm: string = '';

  onPageChange(event: number): void {
    this.pageChange.emit(event);
  }

  onSearchChange() {
    this.searchTermChange.emit(this.searchTerm);
  }
}
