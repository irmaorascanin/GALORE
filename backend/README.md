# Art Marketplace Backend

A backend system for managing an online art marketplace. Built with Node.js, Express, TypeScript, and Prisma, the application supports user registration, artist profile creation, and artwork management with full CRUD functionality.

## 🛠 Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod (for validation)

## 🚀 Features

- User registration & login (with hashed passwords)
- JWT-based authentication
- Protected routes using middleware
- Artist profile creation (only once per user)
- Full CRUD operations for artworks
- Input validation using Zod
- Use of design patterns: Middleware & Service Layer

## 📂 Project Structure
src/
├── controllers/         # Handles HTTP request logic
├── routes/              # API route definitions
├── services/            # Business logic and DB interaction
├── middleware/          # Authentication middleware
├── validators/          # Input validation schemas (Zod)
├── config/              # Prisma client config
## 🧪 API Endpoints

### Auth Routes
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive JWT

### Artist Routes
- `POST /api/artworks/artist` – Create artist profile (JWT required)

### Artwork Routes
- `POST /api/artworks` – Add artwork (JWT + artist only)
- `GET /api/artworks` – Get all artworks
- `GET /api/artworks/:id` – Get single artwork
- `PUT /api/artworks/:id` – Update artwork (JWT required)
- `DELETE /api/artworks/:id` – Delete artwork (JWT required)

## 🧰 Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Create `.env` with:
DATABASE_URL=postgresql://user:password@localhost:5432/art_marketplace
JWT_SECRET=your_jwt_secret
4. Run migrations:
npx prisma migrate dev –name init
5. Start the server:
npm run dev
## 📐 Design Patterns Used

### Middleware Pattern
Used in `auth.middleware.ts` to handle JWT token validation across protected routes.

### Service Layer Pattern
Business logic for users, artists, and artworks is abstracted into `auth.service.ts` and `artwork.service.ts` for clean separation of concerns.

---
