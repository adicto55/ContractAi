# DocAI — Document Intelligence Platform

AI-powered document analysis frontend built with React.

## Quick start

```bash
npm install
npm start
```

Opens at `http://localhost:3000`.

## Structure

```
src/
  components/   Navbar, UploadZone, Stats, ResultCard, Loader
  pages/        Dashboard, About, Contact
  services/     api.js, fileService.js
  styles/       main.css
```

## Usage

1. Open the Dashboard and drag-and-drop files (PDF, DOCX, TXT, CSV)
2. Click **Analyze** — results appear below
3. If no backend is running, a mock result is shown for demo purposes

## Backend

Set your API URL in a `.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Expected endpoint: `POST /api/analyze` — accepts `multipart/form-data` with a `files` field, returns an array of `{ filename, summary, keywords, sentiment }`.