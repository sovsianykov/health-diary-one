import type { MealType } from '@/types'

/**
 * Format a numeric health metric (1–10) into a descriptive label
 */
export function formatLevel(value: number | null | undefined, max = 10): string {
  if (value == null) return '—'
  return `${value}/${max}`
}

/**
 * Format blood pressure string for display
 */
export function formatBloodPressure(value: string | null | undefined): string {
  if (!value) return '—'
  return `${value} мм рт.ст.`
}

/**
 * Format heart rate
 */
export function formatHeartRate(value: number | null | undefined): string {
  if (value == null) return '—'
  return `${value} уд/мин`
}

/**
 * Format temperature
 */
export function formatTemperature(value: number | null | undefined): string {
  if (value == null) return '—'
  return `${value} °C`
}

/**
 * Format weight
 */
export function formatWeight(value: number | null | undefined): string {
  if (value == null) return '—'
  return `${value} кг`
}

/**
 * Format sleep hours
 */
export function formatSleep(value: number | null | undefined): string {
  if (value == null) return '—'
  const hours = Math.floor(value)
  const minutes = Math.round((value - hours) * 60)
  if (minutes === 0) return `${hours} ч`
  return `${hours} ч ${minutes} мин`
}

/**
 * Format walk duration
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} мин`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h} ч` : `${h} ч ${m} мин`
}

/**
 * Format walk distance
 */
export function formatDistance(km: number | null | undefined): string {
  if (km == null) return '—'
  return `${km} км`
}

/**
 * Meal type labels in Russian
 */
export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус',
}

/**
 * Stress level descriptors
 */
export function formatStressLevel(level: number): string {
  if (level <= 2) return 'Очень низкий'
  if (level <= 4) return 'Низкий'
  if (level <= 6) return 'Умеренный'
  if (level <= 8) return 'Высокий'
  return 'Очень высокий'
}

/**
 * Color classes for stress levels
 */
export function getStressColor(level: number): string {
  if (level <= 3) return 'var(--color-success)'
  if (level <= 6) return 'var(--color-warning)'
  return 'var(--color-danger)'
}

/**
 * Color for mood/energy/pain levels
 */
export function getMetricColor(value: number, invert = false): string {
  const high = invert ? 'var(--color-danger)' : 'var(--color-success)'
  const low = invert ? 'var(--color-success)' : 'var(--color-danger)'
  if (value >= 7) return high
  if (value >= 4) return 'var(--color-warning)'
  return low
}

/**
 * Format a number to one decimal place, or return '—'
 */
export function formatOptionalNumber(
  value: number | null | undefined,
  decimals = 1
): string {
  if (value == null) return '—'
  return value.toFixed(decimals)
}
