import type {
  DayEntry,
  Medication,
  Meal,
  Walk,
  StressRecord,
  Wellbeing,
  MealType,
} from '@prisma/client'

// ─── Re-exports from Prisma ───────────────────────────────────────────────────

export type { DayEntry, Medication, Meal, Walk, StressRecord, Wellbeing, MealType }

// ─── Extended types with relations ───────────────────────────────────────────

/** DayEntry with all nested relations included */
export type DayEntryFull = DayEntry & {
  medications: Medication[]
  meals: Meal[]
  walks: Walk[]
  stressRecords: StressRecord[]
  wellbeing: Wellbeing | null
}

/** Lightweight DayEntry for calendar display */
export type DayEntryCalendar = Pick<DayEntry, 'id' | 'date'>

// ─── Form types (used by React Hook Form) ────────────────────────────────────

export type MedicationFormData = {
  name: string
  takenAt: string
  dosage: string
  notes: string
}

export type MealFormData = {
  time: string
  type: MealType
  description: string
}

export type WalkFormData = {
  startTime: string
  durationMinutes: number
  distance: string
  notes: string
}

export type StressFormData = {
  time: string
  level: number
  reason: string
}

export type WellbeingFormData = {
  energy: number
  mood: number
  pain: number
  sleepHours: string
  weight: string
  bloodPressure: string
  heartRate: string
  temperature: string
  notes: string
}

export type DayFormData = {
  date: string
  medications: MedicationFormData[]
  meals: MealFormData[]
  walks: WalkFormData[]
  stressRecords: StressFormData[]
  wellbeing: WellbeingFormData
}

// ─── Server Action result types ───────────────────────────────────────────────

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }

// ─── Statistics ───────────────────────────────────────────────────────────────

export type StatsDataPoint = {
  date: string          // formatted date label
  mood?: number | null
  energy?: number | null
  pain?: number | null
  stress?: number | null
  sleepHours?: number | null
  weight?: number | null
  heartRate?: number | null
  temperature?: number | null
  walkCount?: number
  totalDistance?: number
  medicationCount?: number
}

export type StatsOverview = {
  avgMood: number | null
  avgEnergy: number | null
  avgPain: number | null
  avgStress: number | null
  avgSleep: number | null
  totalWalks: number
  totalMedications: number
}
