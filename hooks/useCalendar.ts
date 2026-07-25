'use client'

import { useState, useCallback } from 'react'
import { getNextMonth, getPrevMonth } from '@/utils/date'

export function useCalendar(initialDate?: Date) {
  const [currentDate, setCurrentDate] = useState(() => initialDate ?? new Date())

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prev) => getNextMonth(prev))
  }, [])

  const goToPrevMonth = useCallback(() => {
    setCurrentDate((prev) => getPrevMonth(prev))
  }, [])

  const goToToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  return {
    currentDate,
    year,
    month,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
  }
}
