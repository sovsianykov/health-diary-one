import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  isToday,
  getDay,
} from 'date-fns'
import { ru } from 'date-fns/locale'

/**
 * Format a date to a human-readable string (e.g. "21 июля 2026")
 */
export function formatDisplayDate(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'd MMMM yyyy', { locale: ru })
}

/**
 * Format a date to "YYYY-MM-DD" for DB/URL usage
 */
export function formatISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

/**
 * Parse an ISO date string to Date object
 */
export function parseDate(dateString: string): Date {
  return parseISO(dateString)
}

/**
 * Get all days in a month as Date array
 */
export function getDaysInMonth(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month))
  const end = endOfMonth(new Date(year, month))
  return eachDayOfInterval({ start, end })
}

/**
 * Get the day of week index (0=Mon, 6=Sun) for grid positioning.
 * Converts JS Sunday=0 convention to Monday-first.
 */
export function getMondayBasedDayOfWeek(date: Date): number {
  const day = getDay(date) // 0=Sun, 1=Mon...
  return day === 0 ? 6 : day - 1
}

/**
 * Navigate months
 */
export function getNextMonth(date: Date): Date {
  return addMonths(date, 1)
}

export function getPrevMonth(date: Date): Date {
  return subMonths(date, 1)
}

/**
 * Formatters for display
 */
export function formatMonthYear(date: Date): string {
  return format(date, 'LLLL yyyy', { locale: ru })
}

export function formatDayNumber(date: Date): string {
  return format(date, 'd')
}

export function formatTime(time: string): string {
  return time // already "HH:mm"
}

/**
 * Comparison helpers
 */
export { isSameDay, isSameMonth, isToday }
