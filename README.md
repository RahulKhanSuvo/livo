# LIVO — Furniture E‑Commerce Platform

A full‑stack furniture commerce platform built as a portfolio piece, featuring a polished storefront and a complete admin dashboard. Designed with modern React patterns, server‑driven data fetching, and a type‑safe end‑to‑end data layer.

## ✨ Highlights

- **Storefront** — responsive product grid with infinite scroll, faceted filtering (category, brand, material, stock, price), full‑text search, product detail pages with image galleries, variant selection, reviews, and a "You May Also Like" related‑products section.
- **Checkout & Payments** — cart, Stripe‑ready checkout, and order management.
- **Admin Dashboard** — catalog management (products, variants, categories, brands, materials), inventory status toggles, pagination/filtering with streaming Suspense, stats cards, and a reviews/payments/coupons/customers section.
- **Auth** — session‑based authentication with Better Auth (admin + customer roles).
- **Media** — async image uploads to Cloudinary.

## 🧱 Tech Stack

| Layer       | Choice                                                          |
| ----------- | --------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Server Actions, React 19)               |
| Language    | TypeScript (strict)                                             |
| Database    | PostgreSQL via Prisma 7 (pg driver adapter)                     |
| Data Fetch  | TanStack React Query (prefetch + hydration, `keepPreviousData`) |
| Forms       | TanStack React Form + Zod validation                            |
| Tables/UI   | TanStack Table, Radix UI + shadcn/ui, Tailwind CSS v4           |
| Auth        | Better Auth                                                     |
| Payments    | Stripe                                                          |
| Media       | Cloudinary                                                      |
| Misc        | Zustand, Swiper, Recharts, Sonner, Motion, Hugeicons            |
| Package Mgr | Bun                                                             |

## 🏗️ Architecture Notes

- **Server‑first data flow** — Server Components prefetch queries and hydrate them through a `HydrationBoundary`; Client Components consume them with `useQuery`/`useSuspenseQuery`. List views use split `<Suspense>` boundaries (stats + list) so each section streams independently.
- **Optimistic, transition‑driven navigation** — `useServerPagination` routes every URL change (`page`, `filter`, `search`, `sort`) through `useTransition`, keeping previous data visible and dimming it while new data resolves — no full‑page skeleton flashes.
- **Type‑safe mutations** — Server Actions are wrapped with Zod‑validated schemas; Prisma nested writes reduce round‑trips on complex relational models.
- **Responsive, accessible UI** — shadcn/Radix primitives, mobile‑first layouts, and consistent design tokens defined in `globals.css`.

## 🚀 Getting Started

Prerequisites: **Bun**, **PostgreSQL**, and a `.env` with `DATABASE_URL`, Better Auth secrets, and Cloudinary/Stripe keys.

```bash
# Install dependencies (generates Prisma client via postinstall)
bun install

# Push schema & seed
bunx prisma db push
bun run db:seed

# Dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin lives at `/admin`.

## 📜 Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `bun run dev`     | Start Next.js dev server |
| `bun run build`   | Production build         |
| `bun run start`   | Run production server    |
| `bun run lint`    | ESLint                   |
| `bun run format`  | Prettier write           |
| `bun run db:seed` | Seed the database        |

## 📁 Project Structure (high level)

```
src/
├─ actions/         # Server Actions (Zod-validated)
├─ app/             # App Router routes (storefront + admin)
├─ components/      # UI, admin, product, shared
├─ hooks/           # useServerPagination, etc.
├─ lib/             # query client, auth, utils
├─ queries/         # React Query definitions
└─ prisma/          # Schema & seed
```

---

_Built as a portfolio project to demonstrate production‑grade Next.js, Prisma, and TanStack patterns._
