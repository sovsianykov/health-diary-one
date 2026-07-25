# Health Diary — Architecture & Developer Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack & Library Rationale](#2-technology-stack--library-rationale)
3. [Project Structure](#3-project-structure)
4. [Prisma Schema & Data Models](#4-prisma-schema--data-models)
5. [Pages & Routing](#5-pages--routing)
6. [Components & UI Kit](#6-components--ui-kit)
7. [Data Layer Architecture](#7-data-layer-architecture)
8. [Forms & Validation](#8-forms--validation)
9. [Styling System](#9-styling-system)
10. [Development Plan & Phases](#10-development-plan--phases)
11. [Future Extensions](#11-future-extensions)

---

## 1. Project Overview

**Health Diary** (Дневник здоровья) is a personal health tracking web application built with Next.js 16 App Router. Users can log daily health events — medications taken, meals eaten, walks completed, stress levels experienced, and overall wellbeing metrics — and then review statistics and trends over time through interactive charts.

### Core User Flows

1. **Home (Calendar)** — User sees a monthly calendar. Each day with an existing record is visually marked. Clicking a day opens it or creates a new entry.
2. **Create Entry** — A long scrollable form divided into thematic cards. Supports dynamic addition of multiple medications, meals, walks, and stress records via `useFieldArray`.
3. **View Entry** — Read-only view of the day with all health data displayed in clean cards.
4. **Edit Entry** — Same form as Create, pre-populated with existing data.
5. **Statistics** — Multiple Recharts diagrams aggregating data over time.

---

## 2. Technology Stack & Library Rationale

### Framework

| Library | Version | Reason |
|---|---|---|
| **Next.js** | 16 | App Router, Server Components, Server Actions, file-based routing |
| **React** | 19 | Built into Next.js 16; concurrent features, useActionState |
| **TypeScript** | 5 | Strict type safety across all layers |

### Database & ORM

| Library | Version | Reason |
|---|---|---|
| **Prisma** | 5 | Type-safe ORM, schema-first, excellent migration tooling |
| **PostgreSQL (Neon)** | — | Serverless Postgres, ideal for Vercel deployments |
| **@prisma/client** | 5 | Auto-generated, fully typed DB client |

### Forms & Validation

| Library | Version | Reason |
|---|---|---|
| **React Hook Form** | ^7 | Uncontrolled forms for performance; `useFieldArray` for dynamic lists |
| **@hookform/resolvers** | ^3 | Zod adapter for RHF |
| **Zod** | ^3 | Schema validation: client-side (RHF) and server-side (Server Actions) |

### UI Primitives

| Library | Reason |
|---|---|
| **Radix UI** | Accessible, unstyled primitives; handles keyboard nav, ARIA, focus management |
| **lucide-react** | Consistent, tree-shakeable icon set |
| **clsx** | Conditional className composition |

### Charts

| Library | Reason |
|---|---|
| **Recharts** | Declarative React charts; LineChart, BarChart, AreaChart, PieChart — all built on SVG |

### Styling

| Library | Reason |
|---|---|
| **Tailwind CSS v4** | Utility-first layout; `@import 'tailwindcss'` (no config file needed in v4) |
| **SCSS Modules** | Component-scoped complex styles; animations, nested rules, mixins |
| **sass** | SCSS preprocessor — Next.js supports `.module.scss` natively |

### Utilities

| Library | Reason |
|---|---|
| **date-fns** | Lightweight, modular date manipulation and formatting |

---

## 3. Project Structure

```
healh-diary/
│
├── prisma/
│   └── schema.prisma           # Database schema
│
├── app/                        # Next.js App Router
│   ├── globals.css             # Tailwind v4 base + CSS custom properties
│   ├── layout.tsx              # Root layout (html, body, fonts, ToastProvider)
│   ├── page.tsx                # Home page — calendar view
│   ├── loading.tsx             # Root loading skeleton
│   ├── error.tsx               # Root error boundary
│   │
│   ├── day/
│   │   ├── new/
│   │   │   └── page.tsx        # Create new day entry
│   │   └── [id]/
│   │       ├── page.tsx        # View day entry
│   │       ├── loading.tsx
│   │       └── edit/
│   │           └── page.tsx    # Edit day entry
│   │
│   ├── stats/
│   │   ├── page.tsx            # Statistics page
│   │   └── loading.tsx
│   │
│   └── actions/               # Server Actions (all 'use server')
│       ├── day-entries.ts
│       ├── medications.ts
│       ├── meals.ts
│       ├── walks.ts
│       ├── stress.ts
│       └── wellbeing.ts
│
├── components/
│   ├── ui/                     # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Slider.tsx
│   │   ├── Dialog.tsx
│   │   ├── Toast.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Separator.tsx
│   │   ├── EmptyState.tsx
│   │   ├── PageHeader.tsx
│   │   ├── StatCard.tsx
│   │   └── LoadingSpinner.tsx
│   │
│   └── layout/
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── layout.module.scss
│
├── features/                   # Feature-scoped components
│   ├── calendar/
│   │   ├── Calendar.tsx
│   │   └── calendar.module.scss
│   │
│   ├── day-form/
│   │   ├── DayForm.tsx         # Root form orchestrator
│   │   ├── MedicationSection.tsx
│   │   ├── MealSection.tsx
│   │   ├── WalkSection.tsx
│   │   ├── StressSection.tsx
│   │   ├── WellbeingSection.tsx
│   │   └── day-form.module.scss
│   │
│   ├── day-view/
│   │   ├── DayView.tsx
│   │   ├── MedicationCard.tsx
│   │   ├── MealCard.tsx
│   │   ├── WalkCard.tsx
│   │   ├── StressCard.tsx
│   │   ├── WellbeingCard.tsx
│   │   └── day-view.module.scss
│   │
│   └── stats/
│       ├── StatsClient.tsx
│       ├── MoodStressChart.tsx
│       ├── WellbeingChart.tsx
│       ├── WalkBarChart.tsx
│       ├── WeightChart.tsx
│       ├── SleepChart.tsx
│       └── stats.module.scss
│
├── lib/
│   └── prisma.ts               # Prisma singleton (prevents hot-reload connections)
│
├── services/                   # Business logic — no Prisma in components
│   ├── day-entry.service.ts
│   ├── medication.service.ts
│   ├── meal.service.ts
│   ├── walk.service.ts
│   ├── stress.service.ts
│   └── wellbeing.service.ts
│
├── validators/                 # Zod schemas
│   ├── day-entry.schema.ts
│   ├── medication.schema.ts
│   ├── meal.schema.ts
│   ├── walk.schema.ts
│   ├── stress.schema.ts
│   ├── wellbeing.schema.ts
│   └── index.ts
│
├── types/
│   └── index.ts                # Shared TS types and Prisma-derived types
│
├── hooks/
│   ├── useToast.ts             # Toast notification hook
│   └── useCalendar.ts          # Calendar state management
│
└── utils/
    ├── date.ts                 # date-fns helpers
    └── format.ts               # Value formatting (BP, units, etc.)
```

---

## 4. Prisma Schema & Data Models

### Entity Relationship Diagram

```
DayEntry (1) ──── (N) Medication
DayEntry (1) ──── (N) Meal
DayEntry (1) ──── (N) Walk
DayEntry (1) ──── (N) StressRecord
DayEntry (1) ──── (1) Wellbeing
```

### DayEntry

The root entity representing a single calendar day.

| Field | Type | Notes |
|---|---|---|
| `id` | String | CUID primary key |
| `date` | DateTime | `@db.Date` — one per day, unique |
| `createdAt` | DateTime | Auto set on creation |
| `updatedAt` | DateTime | Auto updated on write |

### Medication

Medicines taken on a given day.

| Field | Type | Notes |
|---|---|---|
| `id` | String | CUID |
| `dayId` | String | FK → DayEntry |
| `name` | String | Medicine name |
| `takenAt` | String | Time string "HH:mm" |
| `dosage` | String? | Optional dosage info |
| `notes` | String? | Optional notes |

### Meal

Food intake entries.

| Field | Type | Notes |
|---|---|---|
| `id` | String | CUID |
| `dayId` | String | FK → DayEntry |
| `time` | String | "HH:mm" |
| `type` | MealType | Enum: breakfast/lunch/dinner/snack |
| `description` | String | What was eaten |

### Walk

Physical activity entries.

| Field | Type | Notes |
|---|---|---|
| `id` | String | CUID |
| `dayId` | String | FK → DayEntry |
| `startTime` | String | "HH:mm" |
| `durationMinutes` | Int | Duration in minutes |
| `distance` | Float? | Distance in km |
| `notes` | String? | Optional notes |

### StressRecord

Stress level snapshots.

| Field | Type | Notes |
|---|---|---|
| `id` | String | CUID |
| `dayId` | String | FK → DayEntry |
| `time` | String | "HH:mm" |
| `level` | Int | 1–10 scale |
| `reason` | String? | Optional context |

### Wellbeing

Overall daily health snapshot (one per day).

| Field | Type | Notes |
|---|---|---|
| `id` | String | CUID |
| `dayId` | String | Unique FK → DayEntry |
| `energy` | Int? | 1–10 |
| `mood` | Int? | 1–10 |
| `pain` | Int? | 1–10 |
| `sleepHours` | Float? | Hours slept |
| `weight` | Float? | kg |
| `bloodPressure` | String? | "120/80" format |
| `heartRate` | Int? | bpm |
| `temperature` | Float? | °C |
| `notes` | String? | General notes |

---

## 5. Pages & Routing

| URL | Page | Type | Description |
|---|---|---|---|
| `/` | `app/page.tsx` | Server | Calendar — shows monthly view |
| `/day/new` | `app/day/new/page.tsx` | Server | Create new day entry |
| `/day/new?date=YYYY-MM-DD` | Same | Server | Pre-fill date from calendar click |
| `/day/[id]` | `app/day/[id]/page.tsx` | Server | Read-only day view |
| `/day/[id]/edit` | `app/day/[id]/edit/page.tsx` | Server | Edit day entry |
| `/stats` | `app/stats/page.tsx` | Server | Statistics charts |

### Server vs Client Component Strategy

- **Server Components**: All pages, data-fetching, initial render
- **Client Components** (`'use client'`): Calendar interactivity, form inputs (RHF), chart components (Recharts)
- **Server Actions** (`'use server'`): All DB writes — create, update, delete

---

## 6. Components & UI Kit

### UI Primitives (`components/ui/`)

| Component | Radix Primitive | Purpose |
|---|---|---|
| `Button` | — | Variants: default, outline, ghost, destructive |
| `Card` | — | Container with header, body, footer slots |
| `Input` | — | Controlled text input with label + error |
| `Textarea` | — | Multi-line text input |
| `Select` | `@radix-ui/react-select` | Accessible dropdown select |
| `Badge` | — | Small status pill |
| `Slider` | `@radix-ui/react-slider` | 1–10 range sliders for health metrics |
| `Dialog` | `@radix-ui/react-dialog` | Modal dialogs |
| `Toast` | `@radix-ui/react-toast` | Notification toasts |
| `Tooltip` | `@radix-ui/react-tooltip` | Hover information |
| `Separator` | `@radix-ui/react-separator` | Horizontal/vertical dividers |
| `EmptyState` | — | Illustration + text for empty lists |
| `PageHeader` | — | Page title + subtitle + action button |
| `StatCard` | — | KPI card with value, label, icon |
| `LoadingSpinner` | — | Animated loading indicator |

### Feature Components (`features/`)

**Calendar**
- `Calendar.tsx` — Monthly grid, navigation arrows, day click handler, visual markers for days with entries

**Day Form**
- `DayForm.tsx` — Root RHF `<form>` with `useFieldArray` for dynamic sections
- `MedicationSection.tsx` — List of medication inputs, add/remove buttons
- `MealSection.tsx` — Meal entries with type select
- `WalkSection.tsx` — Walk entries with duration/distance
- `StressSection.tsx` — Stress records with 1–10 slider
- `WellbeingSection.tsx` — Single wellbeing form with all health metrics

**Day View**
- `DayView.tsx` — Layout coordinator
- `MedicationCard.tsx`, `MealCard.tsx`, `WalkCard.tsx`, `StressCard.tsx`, `WellbeingCard.tsx`

**Statistics**
- `StatsClient.tsx` — Client wrapper for all charts
- `MoodStressChart.tsx` — Line chart: mood + stress over time
- `WellbeingChart.tsx` — Area chart: energy, pain
- `WalkBarChart.tsx` — Bar chart: walks per day, total distance
- `WeightChart.tsx` — Line chart: weight trend
- `SleepChart.tsx` — Area chart: sleep hours

---

## 7. Data Layer Architecture

```
Page (Server Component)
    ↓ calls
Service (server-only, uses Prisma)
    ↓ uses
lib/prisma.ts (singleton client)
    ↓ queries
PostgreSQL (Neon)
```

```
Form (Client Component)
    ↓ submits via
Server Action ('use server')
    ↓ validates with Zod
    ↓ calls Service
    ↓ revalidatePath()
    ↓ redirect() or return result
```

### Services

Each service file exports async functions:
- `findById(id)`, `findByDate(date)`, `findAll(options?)` for reads
- `create(data)`, `update(id, data)`, `delete(id)` for writes
- `getStatsData(from, to)` for aggregations

All service functions are server-only and never imported by Client Components directly — they're called from Server Components or via Server Actions.

---

## 8. Forms & Validation

### Schema Strategy

Each entity has a Zod schema in `validators/`:

```ts
// Example: wellbeing.schema.ts
export const WellbeingSchema = z.object({
  energy: z.number().int().min(1).max(10).optional(),
  mood: z.number().int().min(1).max(10).optional(),
  pain: z.number().int().min(1).max(10).optional(),
  sleepHours: z.number().min(0).max(24).optional(),
  weight: z.number().positive().optional(),
  bloodPressure: z.string().regex(/^\d{2,3}\/\d{2,3}$/).optional(),
  heartRate: z.number().int().positive().optional(),
  temperature: z.number().min(35).max(42).optional(),
  notes: z.string().optional(),
})
```

The full `DayFormSchema` combines all sub-schemas with `useFieldArray` arrays for medications, meals, walks, and stress records.

### Server-side Validation

Server Actions re-validate with `safeParse()` before any DB write — client validation is UX, server validation is security.

---

## 9. Styling System

### CSS Custom Properties (globals.css)

All design tokens defined as CSS variables:
```css
:root {
  --color-primary: hsl(217, 91%, 60%);
  --color-primary-dark: hsl(217, 91%, 50%);
  --radius-md: 12px;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);
  /* … */
}
```

### Dual Styling Approach

- **Tailwind CSS v4** — layout (flex, grid, padding, margin, responsive breakpoints)
- **SCSS Modules** — complex component styles (animations, pseudo-elements, nested rules)

Example: Calendar cell hover animation in `calendar.module.scss`, simple grid layout via Tailwind classes.

---

## 10. Development Plan & Phases

| Phase | Tasks | Status |
|---|---|---|
| 1 | DOCS.md | ✅ |
| 2 | Install dependencies | 🔄 |
| 3 | Prisma schema + `.env.example` | 🔄 |
| 4 | `lib/prisma.ts`, `types/index.ts`, utils | 🔄 |
| 5 | Zod validators + service layer | 🔄 |
| 6 | Server Actions | 🔄 |
| 7 | UI Kit components | 🔄 |
| 8 | Layout + Navigation | 🔄 |
| 9 | Calendar (home page) | 🔄 |
| 10 | Day Form (create + edit) | 🔄 |
| 11 | Day View page | 🔄 |
| 12 | Statistics + Charts | 🔄 |
| 13 | Loading + Error states | 🔄 |
| 14 | TypeScript + ESLint + Build validation | 🔄 |

---

## 11. Future Extensions

| Feature | Notes |
|---|---|
| **Authentication** | Add NextAuth.js for multi-user support; wrap all DB queries with user scoping |
| **Photo attachments** | Add meal/walk photos via Vercel Blob or Cloudinary |
| **Export / PDF** | Generate PDF health reports with jsPDF or Puppeteer |
| **Reminders** | Browser notifications for medication reminders (Web Push API) |
| **Doctor mode** | Read-only shareable links for medical professionals |
| **Mobile app** | React Native app sharing validators and service logic |
| **AI insights** | GPT-4 analysis of health patterns with actionable recommendations |
| **Wearable sync** | Apple Health / Google Fit API integration |
| **Dark mode** | CSS variable swap; already structured for easy addition |
| **i18n** | next-intl for multi-language support |
| **Offline support** | Service Worker + IndexedDB cache for offline entry creation |
