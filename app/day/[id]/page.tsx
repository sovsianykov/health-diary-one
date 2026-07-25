import { notFound } from 'next/navigation'
import { getDayEntryById } from '@/services/day-entry.service'
import { DayForm } from '@/features/day-form/DayForm'

interface DayPageProps {
  params: Promise<{ id: string }>
}

export default async function DayPage({ params }: DayPageProps) {
  const { id } = await params
  const entry = await getDayEntryById(id)

  if (!entry) {
    notFound()
  }

  const dateString = entry.date.toISOString().split('T')[0]

  return <DayForm date={dateString} entry={entry} />
}
