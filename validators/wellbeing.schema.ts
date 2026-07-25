import { z } from 'zod'

const optionalPositiveFloat = z
  .string()
  .optional()
  .refine(
    (val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) > 0),
    { message: 'Введите положительное число' }
  )

const optionalPositiveInt = z
  .string()
  .optional()
  .refine(
    (val) => !val || (!isNaN(parseInt(val)) && parseInt(val) > 0),
    { message: 'Введите положительное целое число' }
  )

const optionalLevel = z.number().int().min(1).max(10).optional()

export const WellbeingSchema = z.object({
  energy: optionalLevel,
  mood: optionalLevel,
  pain: optionalLevel,
  sleepHours: optionalPositiveFloat,
  weight: optionalPositiveFloat,
  bloodPressure: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{2,3}\/\d{2,3}$/.test(val),
      { message: 'Формат: 120/80' }
    ),
  heartRate: optionalPositiveInt,
  temperature: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        const n = parseFloat(val)
        return !isNaN(n) && n >= 35 && n <= 42
      },
      { message: 'Температура: 35–42 °C' }
    ),
  notes: z.string().max(1000).optional().or(z.literal('')),
})

export type WellbeingInput = z.infer<typeof WellbeingSchema>
