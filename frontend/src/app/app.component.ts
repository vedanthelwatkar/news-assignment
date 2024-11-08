import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stories } from './models/Stories';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StoryCardComponent } from './components/story-card/story-card.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { StoryTableComponent } from './components/story-table/story-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    StoryCardComponent,
    HeaderComponent,
    StoryTableComponent,
    NgxPaginationModule,
    PaginationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isTable = true;
  stories: Stories[] = [];
  totalEntries = 0;
  currentPage = 1;
  pageSize = 10;
  searchTerm = '';
  isLoading = true;
  private debounceTimeout: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.updatePageSize();
    this.loadStories();
  }

  switchContent() {
    this.isTable = !this.isTable;
    this.updatePageSize();
    this.loadStories();
  }

  updatePageSize() {
    this.pageSize = !this.isTable ? 12 : 10;
  }

  loadStories() {
    this.isLoading = true;
    this.http
      .get<{ stories: Stories[]; totalEntries: number }>(
        `${environment.BASE_URL}?pageNo=${this.currentPage}&pageSize=${this.pageSize}&pattern=${this.searchTerm}`
      )
      .subscribe({
        next: (data) => {
          this.stories = data.stories;
          this.totalEntries = data.totalEntries;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching stories:', error);
          this.isLoading = false;
        },
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadStories();
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.currentPage = 1;

    clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(() => {
      if (this.searchTerm.trim() !== '') {
        this.loadStories();
      } else {
        this.currentPage = 1;
        this.searchTerm = '';
        this.loadStories();
      }
    }, 300);
  }
}
