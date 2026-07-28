# TravelBooking — System Architecture

## Overview

TravelBooking is a multi-tier travel booking platform following a **layered architecture** with clear separation of concerns. The system is split into a **React SPA frontend** and an **Express REST API backend**, communicating over HTTPS.

---

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                       CLIENT TIER                        │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              React SPA (Vite + TypeScript)          │ │
│  │                                                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │ │
│  │  │  Pages   │  │  Stores  │  │  API Client      │  │ │
│  │  │ (Router) │  │(Zustand) │  │  (Axios)         │  │ │
│  │  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │ │
│  │       │              │                 │            │ │
│  │  ┌────┴──────────────┴─────────────────┴─────────┐  │ │
│  │  │            Components (Shadcn + Tailwind)      │  │ │
│  │  └────────────────────────────────────────────────┘  │ │
│  │                                                     │ │
│  │  External SDKs: Mapbox GL │ Stripe.js │ Firebase   │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────┬───────────────────────────────┘
                           │ HTTPS / REST
┌──────────────────────────┴───────────────────────────────┐
│                       SERVER TIER                        │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │           Express API (Node.js + TypeScript)        │ │
│  │                                                     │ │
│  │  ┌────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│  │  │   Routes   │→ │ Controllers │→ │  Services   │  │ │
│  │  │   (v1/*)   │  │             │  │             │  │ │
│  │  └────────────┘  └─────────────┘  └──────┬──────┘  │ │
│  │                                          │         │ │
│  │  ┌────────────┐  ┌─────────────┐  ┌──────┴──────┐  │ │
│  │  │ Middleware  │  │ Validators  │  │Repositories │  │ │
│  │  │ (Auth,Rate │  │   (Zod)     │  │  (Prisma)   │  │ │
│  │  │  Limit,..) │  └─────────────┘  └──────┬──────┘  │ │
│  │  └────────────┘                          │         │ │
│  └──────────────────────────────────────────┼─────────┘ │
│                                             │           │
│  ┌──────────────────────────────────────────┼─────────┐ │
│  │              Background Jobs (BullMQ)    │         │ │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐ │         │ │
│  │  │ Email    │  │ SMS/OTP  │  │ Push   │ │         │ │
│  │  │ Worker   │  │ Worker   │  │ Worker │ │         │ │
│  │  └──────────┘  └──────────┘  └────────┘ │         │ │
│  └─────────────────────────────────────────┼─────────┘ │
└──────────────────────────────────────────────┼───────────┘
                                              │
┌─────────────────────────────────────────────┴───────────┐
│                       DATA TIER                          │
│                                                          │
│  ┌──────────────────┐        ┌──────────────────┐       │
│  │   PostgreSQL 16  │        │     Redis 7      │       │
│  │                  │        │                  │       │
│  │  • Users         │        │  • Sessions      │       │
│  │  • Operators     │        │  • OTP Cache     │       │
│  │  • Buses/Seats   │        │  • Rate Limits   │       │
│  │  • Routes/Trips  │        │  • Job Queues    │       │
│  │  • Bookings      │        │  • Search Cache  │       │
│  │  • Payments      │        │                  │       │
│  │  • Reviews       │        └──────────────────┘       │
│  │  • Notifications │                                   │
│  └──────────────────┘                                   │
└─────────────────────────────────────────────────────────┘
```

---

## Backend Layered Architecture

### Layer Responsibilities

| Layer | Directory | Responsibility |
|---|---|---|
| **Routes** | `src/routes/v1/` | HTTP method + path mapping, middleware binding |
| **Controllers** | `src/controllers/` | Parse request, call service, format response |
| **Services** | `src/services/` | Business logic, orchestration, transactions |
| **Repositories** | `src/repositories/` | Data access via Prisma, query building |
| **Validators** | `src/validators/` | Zod schemas for request body/query/params |
| **Middlewares** | `src/middlewares/` | Auth, error handling, rate limiting, logging |
| **Jobs** | `src/jobs/` | Async background processing (BullMQ workers) |
| **Events** | `src/events/` | Domain event emission and handling |
| **Config** | `src/config/` | Environment parsing, service initialization |

### Request Flow

```
HTTP Request
    │
    ▼
  Route  →  Middleware(s)  →  Validator  →  Controller  →  Service  →  Repository  →  Prisma  →  PostgreSQL
    │                                          │               │
    │                                          │               ├→ Redis (cache)
    │                                          │               ├→ Stripe (payments)
    │                                          │               ├→ Twilio (SMS)
    │                                          │               └→ Firebase (push)
    │                                          │
    ▼                                          ▼
  HTTP Response  ←────────────────────────  Result
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                  Authentication Flows                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Email + OTP                                         │
│     Client → POST /auth/send-otp {email}                │
│     Server → Generate OTP → Store in Redis (5min TTL)   │
│            → Send via Nodemailer                        │
│     Client → POST /auth/verify-otp {email, otp}         │
│     Server → Validate OTP → Issue JWT pair              │
│                                                         │
│  2. Google OAuth                                        │
│     Client → Redirect to /auth/google                   │
│     Server → Passport Google Strategy                   │
│            → Create/find user → Issue JWT pair          │
│            → Redirect to frontend with tokens           │
│                                                         │
│  3. Phone + OTP (Twilio)                                │
│     Client → POST /auth/send-sms-otp {phone}            │
│     Server → Generate OTP → Store in Redis (5min TTL)   │
│            → Send via Twilio                            │
│     Client → POST /auth/verify-sms-otp {phone, otp}     │
│     Server → Validate OTP → Issue JWT pair              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Token Strategy:                                        │
│  • Access Token  — 15min, sent in Authorization header  │
│  • Refresh Token — 7 days, sent in httpOnly cookie      │
│  • Token refresh via POST /auth/refresh                 │
└─────────────────────────────────────────────────────────┘
```

---

## Payment Flow (Stripe)

```
┌────────┐         ┌────────┐         ┌────────┐
│Frontend│         │Backend │         │ Stripe │
└───┬────┘         └───┬────┘         └───┬────┘
    │  Select seats    │                  │
    │  & passengers    │                  │
    │─────────────────>│                  │
    │  POST /bookings  │                  │
    │                  │  Create booking  │
    │                  │  (status=PENDING)│
    │                  │                  │
    │                  │  Create Payment  │
    │                  │  Intent          │
    │                  │─────────────────>│
    │                  │                  │
    │                  │  client_secret   │
    │                  │<─────────────────│
    │  client_secret   │                  │
    │<─────────────────│                  │
    │                  │                  │
    │  Confirm payment │                  │
    │  (Stripe.js)     │                  │
    │─────────────────────────────────────>
    │                  │                  │
    │                  │  Webhook:        │
    │                  │  payment_intent  │
    │                  │  .succeeded      │
    │                  │<─────────────────│
    │                  │                  │
    │                  │  Update booking  │
    │                  │  (CONFIRMED)     │
    │                  │  Send ticket SMS │
    │                  │  Send push notif │
    │                  │                  │
    │  Booking         │                  │
    │  confirmed       │                  │
    │<─────────────────│                  │
```

---

## Data Model (Entity Relationship)

```
┌──────────┐     ┌──────────────┐     ┌──────────┐
│   User   │────<│  UserSession │     │ Operator │
└──────┬───┘     └──────────────┘     └────┬─────┘
       │                                    │
       │         ┌──────────┐              │
       │────────<│  Review  │         ┌────┴─────┐
       │         └──────────┘         │   Bus    │
       │                              └────┬─────┘
       │         ┌──────────┐              │
       │────────<│ Booking  │         ┌────┴─────┐
       │         └──┬───────┘         │   Seat   │
       │            │                 └──────────┘
       │         ┌──┴────────────┐
       │         │BookingPassenger│    ┌──────────┐
       │         └───────────────┘    │  Route   │
       │                              └────┬─────┘
       │         ┌──────────┐              │
       │         │ Payment  │         ┌────┴─────┐
       │         └──────────┘         │  Stop    │
       │                              └──────────┘
       │         ┌──────────┐
       │────────<│   OTP    │         ┌──────────┐
       │         └──────────┘         │   Trip   │
       │                              └──────────┘
       │         ┌──────────────┐
       └────────<│ Notification │     ┌──────────┐
                 └──────────────┘     │  Coupon  │
                                      └──────────┘
```

---

## Frontend Architecture

### Feature-Sliced Design

Each feature module under `src/features/` is self-contained:

```
features/
  booking/
    ├── components/       # Feature-specific components
    ├── hooks/            # Feature-specific hooks
    ├── services/         # Feature-specific API calls
    ├── types/            # Feature-specific types
    └── index.ts          # Public API (barrel export)
```

### State Management Strategy

| Store | Purpose | Persistence |
|---|---|---|
| `authStore` | User session, tokens, profile | localStorage (tokens) |
| `bookingStore` | Search params, selected trip, seat selection | sessionStorage |
| `uiStore` | Theme, sidebar state, modals | localStorage |
| `notificationStore` | FCM token, notification list | memory |

### API Client Architecture

```
api/
  ├── client.ts           # Axios instance with interceptors
  ├── auth.api.ts          # Auth endpoints
  ├── booking.api.ts       # Booking endpoints
  ├── bus.api.ts           # Bus/trip endpoints
  ├── payment.api.ts       # Payment endpoints
  ├── review.api.ts        # Review endpoints
  └── notification.api.ts  # Notification endpoints
```

Interceptors handle:
- JWT access token injection
- 401 → automatic token refresh → retry
- Global error toast notifications
- Request/response logging (dev only)

---

## Security Considerations

| Concern | Implementation |
|---|---|
| **XSS** | React DOM escaping, CSP headers, DOMPurify for user content |
| **CSRF** | SameSite cookies, origin validation |
| **SQL Injection** | Prisma parameterized queries |
| **Rate Limiting** | Express rate limiter middleware + Redis sliding window |
| **Auth** | bcrypt password hashing, JWT with short-lived access tokens |
| **Secrets** | Environment variables, never committed to git |
| **CORS** | Whitelist-only origins |
| **Input Validation** | Zod schemas on every endpoint |
| **Helmet** | Security headers (HSTS, X-Frame-Options, etc.) |

---

## Deployment Topology (Production)

```
                    ┌─────────────┐
                    │   CDN       │
                    │ (CloudFront)│
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
     ┌────────┴────────┐     ┌─────────┴─────────┐
     │  Static Assets  │     │   API Gateway /    │
     │  (S3 / Nginx)   │     │   Load Balancer    │
     │  Frontend SPA   │     └─────────┬──────────┘
     └─────────────────┘               │
                              ┌────────┴────────┐
                              │                 │
                     ┌────────┴──────┐  ┌───────┴───────┐
                     │  API Server  │  │  API Server   │
                     │  (Container) │  │  (Container)  │
                     └────────┬─────┘  └───────┬───────┘
                              │                │
                    ┌─────────┴────────────────┴──────────┐
                    │                                     │
           ┌────────┴────────┐              ┌─────────────┴──┐
           │  PostgreSQL     │              │     Redis      │
           │  (RDS/Cloud SQL)│              │  (ElastiCache) │
           └─────────────────┘              └────────────────┘
```
