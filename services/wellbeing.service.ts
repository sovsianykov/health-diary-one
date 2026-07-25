import { prisma } from '@/lib/prisma'
import type { Wellbeing } from '@/types'
import type { WellbeingInput } from '@/validators'

/** Upsert wellbeing for a day */
export async function upsertWellbeing(
  dayId: string,
  data: WellbeingInput
): Promise<Wellbeing> {
  return prisma.wellbeing.upsert({
    where: { dayId },
    create: {
      dayId,
      energy: data.energy ?? null,
      mood: data.mood ?? null,
      pain: data.pain ?? null,
      sleepHours: data.sleepHours ? parseFloat(data.sleepHours) : null,
      weight: data.weight ? parseFloat(data.weight) : null,
      bloodPressure: data.bloodPressure || null,
      heartRate: data.heartRate ? parseInt(data.heartRate) : null,
      temperature: data.temperature ? parseFloat(data.temperature) : null,
      notes: data.notes || null,
    },
    update: {
      energy: data.energy ?? null,
      mood: data.mood ?? null,
      pain: data.pain ?? null,
      sleepHours: data.sleepHours ? parseFloat(data.sleepHours) : null,
      weight: data.weight ? parseFloat(data.weight) : null,
      bloodPressure: data.bloodPressure || null,
      heartRate: data.heartRate ? parseInt(data.heartRate) : null,
      temperature: data.temperature ? parseFloat(data.temperature) : null,
      notes: data.notes || null,
    },
  })
}
