import { prisma } from '@/lib/prisma'
import type { Meal } from '@/types'
import type { MealInput } from '@/validators'

export async function replaceMeals(
  dayId: string,
  meals: MealInput[]
): Promise<Meal[]> {
  await prisma.meal.deleteMany({ where: { dayId } })

  if (meals.length === 0) return []

  await prisma.meal.createMany({
    data: meals.map((m) => ({
      dayId,
      time: m.time,
      type: m.type,
      description: m.description,
    })),
  })

  return prisma.meal.findMany({
    where: { dayId },
    orderBy: { time: 'asc' },
  })
}
