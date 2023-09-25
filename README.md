### Live Link: https://book-core-service-production.up.railway.app/

### Application Routes:

## admin email & password:

```json
{
  "email": "zaman@example.com",
  "password": "123456"
}
```

## admin email & password:

```json
{
  "email": "maink@example.com",
  "password": "123456"
}
```

admin jwt:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiI0Y2E2ZTYyZS02OWFmLTRjMjMtYmEyMC1lMzlhM2YyZjRmNDgiLCJpYXQiOjE2OTU2NjM1NzQsImV4cCI6MTcyNzE5OTU3NH0.iDdINPP0FX71eU9NUjftjIqOZpTSxzDJMUPBhaLfVfE

```

customer jwt:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY3VzdG9tZXIiLCJ1c2VySWQiOiI1MmUzNDg1Zi0zMjlhLTQ0NzEtODZkYy1jZDY1MmM0YzY5NTEiLCJpYXQiOjE2OTU2NjUzMTcsImV4cCI6MTcyNzIwMTMxN30.Yh4irNLgQr2APCo8sJPwIFX0ob7hxBKA2tmvt6K7WIE
```

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/52e3485f-329a-4471-86dc-cd652c4c6951 (Single GET) Include an id that is saved in your database
- api/v1/users/52e3485f-329a-4471-86dc-cd652c4c6951 (PATCH)
- api/v1/users/52e3485f-329a-4471-86dc-cd652c4c6951 (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/f026eb05-689f-4070-afa1-b4d413eb66f4 (Single GET) Include an id that is saved in your database
- api/v1/categories/f026eb05-689f-4070-afa1-b4d413eb66f4 (PATCH)
- api/v1/categories/f026eb05-689f-4070-afa1-b4d413eb66f4 (DELETE) Include an id that is saved in your database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)
