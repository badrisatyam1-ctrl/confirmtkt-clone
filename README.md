# TravelBooking

A production-ready travel booking platform built with React, Node.js, and PostgreSQL — inspired by RedBus.

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript 5 | Type safety |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| Shadcn UI | Component library (Radix primitives) |
| React Router 6 | Client-side routing |
| Zustand | State management |
| Axios | HTTP client |
| Mapbox GL JS | Interactive maps |
| Stripe.js | Payment UI elements |
| Firebase JS SDK | Push notifications |
| React Hook Form + Zod | Form handling & validation |

### Backend
| Technology | Purpose |
|---|---|
| Node.js 20 | Runtime |
| Express 4 | HTTP framework |
| TypeScript 5 | Type safety |
| Prisma 5 | ORM & migrations |
| PostgreSQL 16 | Primary database |
| Redis 7 | Caching & job queues |
| JWT | Authentication tokens |
| Google OAuth | Social login |
| Stripe Node SDK | Payment processing |
| Twilio | SMS / OTP delivery |
| Firebase Admin | Push notifications |
| BullMQ | Background job processing |
| Nodemailer | Email delivery |
| Zod | Request validation |
| Jest + Supertest | Testing |

---

## Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x
- **Docker** & **Docker Compose** (for databases)
- **PostgreSQL 16** (or use Docker)
- **Redis 7** (or use Docker)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/TravelBooking.git
cd TravelBooking
```

### 2. Environment Variables

Copy the example environment files and fill in your credentials:

```bash
# Root
cp .env.example .env

# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

### 3. Start Infrastructure (Docker)

```bash
docker-compose up -d postgres redis
```

This starts PostgreSQL on port `5432` and Redis on port `6379`.

### 4. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npm run db:seed

# Start development server
npm run dev
```

The API will be available at `http://localhost:4000`.

### 5. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
TravelBooking/
├── frontend/                    # React SPA
│   ├── src/
│   │   ├── api/                 # API client & endpoint modules
│   │   ├── components/          # Shared UI components
│   │   │   ├── ui/              # Shadcn primitives
│   │   │   ├── layout/          # Layout components
│   │   │   ├── forms/           # Form components
│   │   │   └── maps/            # Map components
│   │   ├── config/              # Runtime configuration
│   │   ├── contexts/            # React contexts
│   │   ├── features/            # Feature modules
│   │   ├── hooks/               # Custom hooks
│   │   ├── lib/                 # Third-party wrappers
│   │   ├── pages/               # Route-level pages
│   │   ├── routes/              # Route definitions
│   │   ├── store/               # Zustand stores
│   │   ├── styles/              # Global styles
│   │   ├── types/               # TypeScript types
│   │   └── utils/               # Utility functions
│   └── ...config files
│
├── backend/                     # Express API
│   ├── prisma/                  # Database schema & migrations
│   ├── src/
│   │   ├── config/              # Service configuration
│   │   ├── controllers/         # Request handlers
│   │   ├── middlewares/         # Express middleware
│   │   ├── routes/v1/           # Versioned API routes
│   │   ├── services/            # Business logic
│   │   ├── repositories/        # Data access layer
│   │   ├── validators/          # Request validation schemas
│   │   ├── types/               # TypeScript types
│   │   ├── jobs/                # Background jobs
│   │   ├── events/              # Event system
│   │   └── utils/               # Utility functions
│   └── ...config files
│
├── docker-compose.yml           # Infrastructure
├── Dockerfile.frontend          # Frontend container
├── Dockerfile.backend           # Backend container
└── architecture.md              # System architecture
```

---

## Available Scripts

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Run Prettier |
| `npm run type-check` | TypeScript type checking (no emit) |

### Backend

| Script | Description |
|---|---|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run compiled production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Run Prettier |
| `npm run type-check` | TypeScript type checking (no emit) |
| `npm run test` | Run Jest test suite |
| `npm run test:watch` | Run Jest in watch mode |
| `npm run test:coverage` | Run Jest with coverage report |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run Prisma migrations (dev) |
| `npm run db:push` | Push schema changes (no migration) |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:reset` | Reset database & re-seed |

---

## Docker

### Full Stack (Development)

```bash
docker-compose up --build
```

### Infrastructure Only

```bash
docker-compose up -d postgres redis
```

### Production Build

```bash
docker-compose -f docker-compose.yml up --build backend frontend
```

---

## API Overview

All API endpoints are versioned under `/api/v1/`.

| Resource | Endpoints |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, `POST /auth/verify-otp`, `GET /auth/google` |
| Users | `GET /users/me`, `PUT /users/me`, `GET /users/:id` |
| Buses | `GET /buses`, `GET /buses/:id`, `POST /buses` (admin) |
| Routes | `GET /routes`, `GET /routes/:id`, `GET /routes/search` |
| Trips | `GET /trips`, `GET /trips/:id`, `GET /trips/search` |
| Bookings | `POST /bookings`, `GET /bookings`, `GET /bookings/:id`, `PUT /bookings/:id/cancel` |
| Payments | `POST /payments/create-intent`, `POST /payments/webhook` |
| Reviews | `POST /reviews`, `GET /reviews/trip/:tripId` |
| Notifications | `POST /notifications/subscribe`, `GET /notifications` |

---

## Environment Variables Reference

See [`.env.example`](.env.example) for the complete list of required environment variables with descriptions.

---

## License

Private — All Rights Reserved.
