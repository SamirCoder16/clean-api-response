# 🚀 clean-api-response

> Production-ready Express middleware to standardize API responses.

A lightweight, dependency-minimal middleware that enforces a consistent API response structure across your entire Express application.

Built for scalable systems, clean architecture, and microservice-friendly backends.

---

## ✨ Features

- ✅ Standardized API response format
- ✅ Centralized error handling
- ✅ Automatic Request ID generation
- ✅ Performance duration tracking
- ✅ Pagination metadata helper
- ✅ Custom HttpError class
- ✅ Native Node.js test runner support
- ✅ Minimal dependencies

---

## 📦 Installation

```bash
npm install clean-api-response
```

---

## 🧱 Standard Response Format

### ✅ Success Response

```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {
    "requestId": "uuid",
    "duration": "12ms"
  }
}
```

---

### ❌ Error Response

```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Unauthorized",
    "code": 401
  },
  "meta": {
    "requestId": "uuid",
    "duration": "8ms"
  }
}
```

---

## 🚀 Usage Example

```js
const express = require("express");
const {
  cleanApiResponse,
  errorHandler,
  HttpError,
  buildPaginationMeta
} = require("clean-api-response");

const app = express();

// Apply middleware BEFORE routes
app.use(cleanApiResponse);

// Success example
app.get("/success", (req, res) => {
  res.success({ name: "Samir" });
});

// Controlled error example
app.get("/error", () => {
  throw new HttpError("Unauthorized", 401);
});

// Pagination example
app.get("/users", (req, res) => {
  const users = [{ id: 1 }];
  const meta = buildPaginationMeta(1, 10, 100);
  res.success(users, meta);
});

// Centralized error handler (always at the end)
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## 📄 API Reference

### 🔹 cleanApiResponse

Middleware array that injects:

- `res.success(data, meta?)`
- `res.error(message, statusCode?)`

Must be used before defining routes.

---

### 🔹 errorHandler

Centralized Express error middleware.

Handles:
- Custom `HttpError`
- Unexpected internal errors (500 fallback)

Must be used after routes.

---

### 🔹 HttpError

Custom error class for controlled HTTP responses.

```js
throw new HttpError("Forbidden", 403);
```

---

### 🔹 buildPaginationMeta(page, limit, total)

Generates pagination metadata.

```js
const meta = buildPaginationMeta(1, 10, 100);
res.success(data, meta);
```

Output:

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## 🧪 Testing

Tested using native Node.js test runner:

```bash
node --test
```

No heavy testing frameworks required.

---

## 🏗 Design Philosophy

- Minimal dependencies
- Production-focused
- Microservice-friendly
- Clean API contracts
- Observability-ready (requestId + duration)

---

## 🛠 Requirements

- Node.js >= 18
- Express >= 4

---

## 📌 Why Use This?

Inconsistent API responses create:

- Frontend complexity
- Debugging confusion
- Poor maintainability
- Inconsistent error structures

This middleware enforces:

✔ Uniform API contracts  
✔ Clean backend architecture  
✔ Better observability  
✔ Easier frontend integration  

---

## 🧠 Roadmap

- [ ] ESM + CJS dual support
- [ ] Configurable response format
- [ ] Fastify adapter
- [ ] Logging hook integration
- [ ] OpenTelemetry support

---

## 📄 License

MIT © Samir Parvez