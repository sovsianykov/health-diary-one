import { z } from 'zod'

const mealTypes = [
  'breakfast',
  'lunch',
  'dinner',
  'snack',
] as const;

export const mealSchema = z.object({
  time: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Неверный формат времени (HH:mm)'),

  type: z.enum(mealTypes, {
    message: 'Выберите тип приёма пищи',
  }),

  description: z
      .string()
      .min(1, 'Опишите что вы ели')
      .max(1000),
});