# Hacker News Stories Viewer

A responsive web application that displays Hacker News stories with multiple view options, search, and pagination.

## Features

- 📱 Card and table view options
- 🔍 Real-time search with debounce
- 📄 Pagination support
- ⚡ Loading indicators
- 🎨 Responsive design

## Tech Stack

- Frontend: Angular
- Backend: Node.js + Express
- UI Components: ngx-pagination

## Quick Start

### Prerequisites

- Node.js & npm
- Angular CLI

### Environment Setup

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  BASE_URL: "http://localhost:3000/api/stories",
};
```

### Installation

**Backend:**

```bash
cd backend
npm install
npm start   # Runs on http://localhost:3000
```

**Frontend:**

```bash
cd frontend
npm install
ng serve    # Runs on http://localhost:4200
```

## Architecture

### Components

- `AppComponent`: Main view controller
- `StoryCardComponent`: Card view display
- `StoryTableComponent`: Table view display
- `HeaderComponent`: Search & navigation
- `PaginationComponent`: Page controls

### API

```
GET /api/stories
Params:
- pageNo: number
- pageSize: number
- pattern: string (search term)
- sort: string (asc or desc based on requirements)
```

## Testing

```bash
# in frontend
ng test

# in backend
npm test
```

## Running in Production

```bash
ng build --configuration production
```
