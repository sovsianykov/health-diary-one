'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  getOrCreateDayEntry,
  getDayEntryById,
  deleteDayEntry,
} from '@/services/day-entry.service'
import { replaceMedications } from '@/services/medication.service'
import { replaceMeals } from '@/services/meal.service'
import { replaceWalks } from '@/services/walk.service'
import { replaceStressRecords } from '@/services/stress.service'
import { upsertWellbeing } from '@/services/wellbeing.service'
import { DayFormSchema } from '@/validators'
import type { ActionResult, DayEntryFull } from '@/types'

/**
 * Save (create or update) a full day entry from form data.
 * Validates with Zod, then upserts all related records.
 */
export async function saveDayEntry(
  rawData: unknown
): Promise<ActionResult<{ id: string }>> {
  const parsed = DayFormSchema.safeParse(rawData)

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Ошибка валидации'
    return { success: false, error: message }
  }

  const { date, medications, meals, walks, stressRecords, wellbeing } = parsed.data

  try {
    const dayEntry = await getOrCreateDayEntry(date)

    await Promise.all([
      replaceMedications(dayEntry.id, medications),
      replaceMeals(dayEntry.id, meals),
      replaceWalks(dayEntry.id, walks),
      replaceStressRecords(dayEntry.id, stressRecords),
      upsertWellbeing(dayEntry.id, wellbeing),
    ])

    revalidatePath('/')
    revalidatePath(`/day/${dayEntry.id}`)
    revalidatePath('/stats')

    return { success: true, data: { id: dayEntry.id } }
  } catch (err) {
    console.error('saveDayEntry error:', err)
    return { success: false, error: 'Ошибка сохранения данных' }
  }
}

/**
 * Delete a day entry and redirect to the home page.
 */
export async function deleteDayEntryAction(id: string): Promise<void> {
  await deleteDayEntry(id)
  revalidatePath('/')
  redirect('/')
}

/**
 * Navigate to a day by date — creates entry if needed, then redirects.
 * Called from the calendar when clicking a day.
 */
export async function navigateToDayByDate(dateString: string): Promise<void> {
  const entry = await getOrCreateDayEntry(dateString)
  redirect(`/day/${entry.id}`)
}

/**
 * Get a day entry by ID for the edit form.
 */
export async function getDayEntryForEdit(
  id: string
): Promise<ActionResult<DayEntryFull>> {
  try {
    const entry = await getDayEntryById(id)
    if (!entry) return { success: false, error: 'Запись не найдена' }
    return { success: true, data: entry }
  } catch {
    return { success: false, error: 'Ошибка загрузки записи' }
  }
}
