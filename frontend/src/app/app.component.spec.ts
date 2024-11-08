import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  discardPeriodicTasks,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should switch content type', fakeAsync(() => {
    const initialState = component.isTable;
    component.switchContent();
    tick();
    expect(component.isTable).not.toBe(initialState);
    httpMock
      .expectOne((req) => req.url.startsWith(environment.BASE_URL))
      .flush({
        stories: [],
        totalEntries: 0,
      });
  }));

  it('should change page', fakeAsync(() => {
    component.onPageChange(2);
    tick();
    expect(component.currentPage).toBe(2);
    httpMock
      .expectOne((req) => req.url.startsWith(environment.BASE_URL))
      .flush({
        stories: [],
        totalEntries: 0,
      });
  }));

  it('should handle search', fakeAsync(() => {
    component.onSearchChange('test');
    tick(300);
    expect(component.searchTerm).toBe('test');
    expect(component.currentPage).toBe(1);
    httpMock
      .expectOne((req) => req.url.startsWith(environment.BASE_URL))
      .flush({
        stories: [],
        totalEntries: 0,
      });
    discardPeriodicTasks();
  }));

  it('should load stories and set isLoading to false when complete', fakeAsync(() => {
    const mockStories = {
      stories: [{ id: 1, title: 'Test Story', url: 'http://test.com' }],
      totalEntries: 1,
    };

    component.loadStories();
    expect(component.isLoading).toBe(true);

    const req = httpMock.expectOne((req) =>
      req.url.startsWith(environment.BASE_URL)
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockStories);

    tick();

    expect(component.isLoading).toBe(false);
    expect(component.stories.length).toBe(1);
    expect(component.totalEntries).toBe(1);
  }));
});
