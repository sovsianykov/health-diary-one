import { prisma } from '@/lib/prisma'
import type { DayEntryCalendar, DayEntryFull } from '@/types'

/**
 * Find a DayEntry by its ID with all nested relations.
 */
export async function getDayEntryById(id: string): Promise<DayEntryFull | null> {
  return prisma.dayEntry.findUnique({
    where: { id },
    include: {
      medications: { orderBy: { takenAt: 'asc' } },
      meals: { orderBy: { time: 'asc' } },
      walks: { orderBy: { startTime: 'asc' } },
      stressRecords: { orderBy: { time: 'asc' } },
      wellbeing: true,
    },
  })
}

/**
 * Find a DayEntry by date string (YYYY-MM-DD).
 * Returns null if no record exists for that date.
 */
export async function getDayEntryByDate(
  dateString: string
): Promise<DayEntryFull | null> {
  const date = new Date(dateString + 'T00:00:00.000Z')
  return prisma.dayEntry.findUnique({
    where: { date },
    include: {
      medications: { orderBy: { takenAt: 'asc' } },
      meals: { orderBy: { time: 'asc' } },
      walks: { orderBy: { startTime: 'asc' } },
      stressRecords: { orderBy: { time: 'asc' } },
      wellbeing: true,
    },
  })
}

/**
 * Get all day entries for a given month as lightweight objects (for calendar display).
 */
export async function getDayEntriesForMonth(
  year: number,
  month: number // 0-indexed
): Promise<DayEntryCalendar[]> {
  const start = new Date(Date.UTC(year, month, 1))
  const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59))

  const entries = await prisma.dayEntry.findMany({
    where: { date: { gte: start, lte: end } },
    select: { id: true, date: true },
    orderBy: { date: 'asc' },
  })

  return entries
}

/**
 * Get all day entries for the statistics page (last N days).
 */
export async function getDayEntriesForStats(
  days = 30
): Promise<DayEntryFull[]> {
  const since = new Date()
  since.setDate(since.getDate() - days)
  since.setUTCHours(0, 0, 0, 0)

  return prisma.dayEntry.findMany({
    where: { date: { gte: since } },
    include: {
      medications: true,
      meals: true,
      walks: true,
      stressRecords: true,
      wellbeing: true,
    },
    orderBy: { date: 'asc' },
  })
}

/**
 * Create a new DayEntry with a specific date.
 * Throws if a record for that date already exists.
 */
export async function createDayEntry(
  dateString: string
): Promise<DayEntryFull> {
  const date = new Date(dateString + 'T00:00:00.000Z')
  return prisma.dayEntry.create({
    data: { date },
    include: {
      medications: true,
      meals: true,
      walks: true,
      stressRecords: true,
      wellbeing: true,
    },
  })
}

/**
 * Delete a DayEntry and all its children (cascade handled by Prisma schema).
 */
export async function deleteDayEntry(id: string): Promise<void> {
  await prisma.dayEntry.delete({ where: { id } })
}

/**
 * Get or create a DayEntry for a given date.
 * Used when clicking on a calendar day.
 */
export async function getOrCreateDayEntry(
  dateString: string
): Promise<DayEntryFull> {
  const existing = await getDayEntryByDate(dateString)
  if (existing) return existing
  return createDayEntry(dateString)
}
