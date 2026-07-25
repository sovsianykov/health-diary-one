import { prisma } from '@/lib/prisma'
import type { Medication } from '@/types'
import type { MedicationInput } from '@/validators'

/** Replace all medications for a day with a new set */
export async function replaceMedications(
  dayId: string,
  medications: MedicationInput[]
): Promise<Medication[]> {
  await prisma.medication.deleteMany({ where: { dayId } })

  if (medications.length === 0) return []

  await prisma.medication.createMany({
    data: medications.map((m) => ({
      dayId,
      name: m.name,
      takenAt: m.takenAt,
      dosage: m.dosage || null,
      notes: m.notes || null,
    })),
  })

  return prisma.medication.findMany({
    where: { dayId },
    orderBy: { takenAt: 'asc' },
  })
}
