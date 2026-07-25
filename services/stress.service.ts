import { prisma } from '@/lib/prisma'
import type { StressRecord } from '@/types'
import type { StressInput } from '@/validators'

export async function replaceStressRecords(
  dayId: string,
  records: StressInput[]
): Promise<StressRecord[]> {
  await prisma.stressRecord.deleteMany({ where: { dayId } })

  if (records.length === 0) return []

  await prisma.stressRecord.createMany({
    data: records.map((r) => ({
      dayId,
      time: r.time,
      level: r.level,
      reason: r.reason || null,
    })),
  })

  return prisma.stressRecord.findMany({
    where: { dayId },
    orderBy: { time: 'asc' },
  })
}
