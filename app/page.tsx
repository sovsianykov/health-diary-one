import { Calendar } from '@/features/calendar/Calendar'
import { getDayEntriesForMonth } from '@/services/day-entry.service'
import { PageHeader } from '@/components/ui/PageHeader'

export default async function HomePage() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const entries = await getDayEntriesForMonth(year, month)

  return (
    <>
      <PageHeader
        title="Календарь"
        subtitle="Выберите день, чтобы просмотреть или создать запись"
      />
      <Calendar entries={entries} initialYear={year} initialMonth={month} />
    </>
  )
}
