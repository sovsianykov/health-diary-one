import { z } from 'zod'

export const MealSchema = z.object({
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Неверный формат времени (HH:mm)'),
  type: z.enum(['breakfast', 'lunch', 'dinner', 'snack'], {
    errorMap: () => ({ message: 'Выберите тип приёма пищи' }),
  }),
  description: z.string().min(1, 'Опишите что вы ели').max(1000),
})

export type MealInput = z.infer<typeof MealSchema>
