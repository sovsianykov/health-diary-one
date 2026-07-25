import { z } from 'zod'
import { MedicationSchema } from './medication.schema'
import { MealSchema } from './meal.schema'
import { WalkSchema } from './walk.schema'
import { StressSchema } from './stress.schema'
import { WellbeingSchema } from './wellbeing.schema'

export { MedicationSchema, MealSchema, WalkSchema, StressSchema, WellbeingSchema }
export type { MedicationInput } from './medication.schema'
export type { MealInput } from './meal.schema'
export type { WalkInput } from './walk.schema'
export type { StressInput } from './stress.schema'
export type { WellbeingInput } from './wellbeing.schema'

/** Full day entry creation schema */
export const DayFormSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Неверный формат даты (YYYY-MM-DD)'),
  medications: z.array(MedicationSchema),
  meals: z.array(MealSchema),
  walks: z.array(WalkSchema),
  stressRecords: z.array(StressSchema),
  wellbeing: WellbeingSchema,
})

export type DayFormInput = z.infer<typeof DayFormSchema>
