import { DayForm } from '@/features/day-form/DayForm'

export default function NewDayPage() {
  const today = new Date().toISOString().split('T')[0]
  return <DayForm date={today} />
}
