import { z } from 'zod'

export const WalkSchema = z.object({
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Неверный формат времени (HH:mm)'),
  durationMinutes: z
    .number({ invalid_type_error: 'Укажите продолжительность' })
    .int('Введите целое число минут')
    .min(1, 'Минимум 1 минута')
    .max(1440, 'Максимум 24 часа'),
  distance: z
    .string()
    .optional()
    .refine(
      (val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) > 0),
      { message: 'Введите положительное число' }
    ),
  notes: z.string().max(500).optional().or(z.literal('')),
})

export type WalkInput = z.infer<typeof WalkSchema>
