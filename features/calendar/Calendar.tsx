'use client'

import { useTransition } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { useCalendar } from '@/hooks/useCalendar'
import { navigateToDayByDate } from '@/app/actions/day-entries'
import {
  getDaysInMonth,
  getMondayBasedDayOfWeek,
  formatMonthYear,
  formatDayNumber,
  formatISODate,
  isSameDay,
  isSameMonth,
  isToday,
} from '@/utils/date'
import type { DayEntryCalendar } from '@/types'
import styles from './calendar.module.scss'

const WEEKDAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

interface CalendarProps {
  entries: DayEntryCalendar[]
  initialYear: number
  initialMonth: number
}

function Calendar({ entries, initialYear, initialMonth }: CalendarProps) {
  const { currentDate, year, month, goToNextMonth, goToPrevMonth, goToToday } =
    useCalendar(new Date(initialYear, initialMonth))

  const [isPending, startTransition] = useTransition()

  const days = getDaysInMonth(year, month)
  const firstDayOffset = getMondayBasedDayOfWeek(days[0])

  function hasEntry(day: Date): boolean {
    return entries.some((e) => isSameDay(new Date(e.date), day))
  }

  function handleDayClick(day: Date) {
    startTransition(async () => {
      await navigateToDayByDate(formatISODate(day))
    })
  }

  return (
    <div className={clsx(styles.calendar, isPending && styles.pending)}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.navButton}
          onClick={goToPrevMonth}
          aria-label="Предыдущий месяц"
        >
          <ChevronLeft size={20} />
        </button>
        <div className={styles.headerCenter}>
          <h2 className={styles.monthLabel}>{formatMonthYear(currentDate)}</h2>
          <button className={styles.todayButton} onClick={goToToday}>
            Сегодня
          </button>
        </div>
        <button
          className={styles.navButton}
          onClick={goToNextMonth}
          aria-label="Следующий месяц"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Weekday labels */}
      <div className={styles.weekdays}>
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className={styles.weekday}>
            {label}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className={styles.grid}>
        {/* Empty cells for offset */}
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className={styles.emptyCell} />
        ))}

        {days.map((day) => {
          const has = hasEntry(day)
          const today = isToday(day)
          const current = isSameMonth(day, currentDate)

          return (
            <button
              key={day.toISOString()}
              className={clsx(
                styles.dayCell,
                today && styles.today,
                has && styles.hasEntry,
                !current && styles.otherMonth
              )}
              onClick={() => handleDayClick(day)}
              disabled={isPending}
            >
              <span className={styles.dayNumber}>{formatDayNumber(day)}</span>
              {has && <span className={styles.marker} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }
