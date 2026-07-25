import { prisma } from '@/lib/prisma'
import type { Walk } from '@/types'
import type { WalkInput } from '@/validators'

export async function replaceWalks(
  dayId: string,
  walks: WalkInput[]
): Promise<Walk[]> {
  await prisma.walk.deleteMany({ where: { dayId } })

  if (walks.length === 0) return []

  await prisma.walk.createMany({
    data: walks.map((w) => ({
      dayId,
      startTime: w.startTime,
      durationMinutes: w.durationMinutes,
      distance: w.distance ? parseFloat(w.distance) : null,
      notes: w.notes || null,
    })),
  })

  return prisma.walk.findMany({
    where: { dayId },
    orderBy: { startTime: 'asc' },
  })
}
