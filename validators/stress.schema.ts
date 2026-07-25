import { z } from 'zod'

export const StressSchema = z.object({
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Неверный формат времени (HH:mm)'),
  level: z
      .number({
        message: 'Укажите уровень стресса',
      })
      .int()
      .min(1, 'Минимальный уровень: 1')
      .max(10, 'Максимальный уровень: 10'),
  reason: z.string().max(500).optional().or(z.literal('')),
})

export type StressInput = z.infer<typeof StressSchema>
