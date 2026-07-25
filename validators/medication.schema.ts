import { z } from 'zod'

export const MedicationSchema = z.object({
  name: z.string().min(1, 'Укажите название лекарства').max(200),
  takenAt: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Неверный формат времени (HH:mm)'),
  dosage: z.string().max(100).optional().or(z.literal('')),
  notes: z.string().max(500).optional().or(z.literal('')),
})

export type MedicationInput = z.infer<typeof MedicationSchema>
