import { getDayEntriesForStats } from '@/services/day-entry.service'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'

export default async function StatsPage() {
  const entries = await getDayEntriesForStats(30)

  // Calculate basic statistics
  const totalEntries = entries.length
  const totalMedications = entries.reduce((sum, e) => sum + e.medications.length, 0)
  const totalMeals = entries.reduce((sum, e) => sum + e.meals.length, 0)
  const totalWalks = entries.reduce((sum, e) => sum + e.walks.length, 0)
  const totalStressRecords = entries.reduce((sum, e) => sum + e.stressRecords.length, 0)

  // Calculate averages for wellbeing metrics
  const entriesWithWellbeing = entries.filter((e) => e.wellbeing)
  const avgEnergy =
    entriesWithWellbeing.length > 0
      ? entriesWithWellbeing.reduce((sum, e) => sum + (e.wellbeing?.energy || 0), 0) / entriesWithWellbeing.length
      : 0
  const avgMood =
    entriesWithWellbeing.length > 0
      ? entriesWithWellbeing.reduce((sum, e) => sum + (e.wellbeing?.mood || 0), 0) / entriesWithWellbeing.length
      : 0

  return (
    <>
      <PageHeader
        title="Статистика"
        subtitle="Обзор ваших записей за последние 30 дней"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <StatCard label="Записей" value={totalEntries} />
        <StatCard label="Приемов лекарств" value={totalMedications} />
        <StatCard label="Приемов пищи" value={totalMeals} />
        <StatCard label="Прогулок" value={totalWalks} />
        <StatCard label="Записей стресса" value={totalStressRecords} />
        <StatCard label="Средняя энергия" value={avgEnergy.toFixed(1)} />
        <StatCard label="Среднее настроение" value={avgMood.toFixed(1)} />
      </div>
    </>
  )
}
