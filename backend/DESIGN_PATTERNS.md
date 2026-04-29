 # Design Patterns in Art Marketplace Backend

## 1. Middleware Pattern

**Location:** `src/middleware/auth.middleware.ts`

### Description:
The Middleware Pattern is applied to handle authentication across protected routes. The middleware function `authenticate` validates JWT tokens, ensures the request is authenticated, and attaches the decoded user information to the request object.

### Benefit:
- Keeps route handlers clean and focused
- Centralizes authentication logic
- Promotes reuse across multiple routes

---

## 2. Service Layer Pattern

**Location:** `src/services/auth.service.ts`, `src/services/artwork.service.ts`

### Description:
Business logic for authentication and artwork management is abstracted into separate service files. Controllers invoke these services, allowing the controllers to remain thin and focused on request-response logic.

### Benefit:
- Clear separation of concerns
- Easier to test and maintain
- Promotes reuse and scalability

---

## Summary

Both patterns enhance the structure, maintainability, and scalability of the backend codebase. They demonstrate a practical application of software design principles in a Node.js + Express + Prisma stack.