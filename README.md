# Word Splitter

This project demonstrates splitting words into three parts with a simple front-end.
A Laravel 12 backend (found in `backend/`) exposes API endpoints secured with
Sanctum for SPA authentication.

## Backend Setup

The backend directory contains a minimal Laravel skeleton with migrations and
controllers for authentication and word splitting. Install dependencies and run
migrations:

```bash
cd backend
composer install
php artisan migrate
```

## API

- `POST /api/register` – create a new user
- `POST /api/login` – login the user
- `POST /api/logout` – logout
- `GET  /api/user` – fetch the current user
- `POST /api/split-word` – split a word and store the result
- `GET  /api/split-history` – list previous splits

The front-end fetches CSRF cookies and sends authenticated requests with the
appropriate headers.
