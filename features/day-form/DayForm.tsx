'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Save } from 'lucide-react'
import { DayFormSchema } from '@/validators'
import { saveDayEntry } from '@/app/actions/day-entries'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { MedicationSection } from './MedicationSection'
import { MealSection } from './MealSection'
import { WalkSection } from './WalkSection'
import { StressSection } from './StressSection'
import { WellbeingSection } from './WellbeingSection'
import type { DayFormData, DayEntryFull } from '@/types'
import type { z } from 'zod'
import styles from './day-form.module.scss'

type DayFormInput = z.infer<typeof DayFormSchema>

interface DayFormProps {
  date: string // YYYY-MM-DD
  entry?: DayEntryFull
}

function DayForm({ date, entry }: DayFormProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [isPending, startTransition] = useTransition()

  const isEditing = !!entry

  const defaultValues: DayFormInput = entry
    ? {
        date: date,
        medications: entry.medications.map((m) => ({
          name: m.name,
          takenAt: m.takenAt,
          dosage: m.dosage ?? '',
          notes: m.notes ?? '',
        })),
        meals: entry.meals.map((m) => ({
          time: m.time,
          type: m.type,
          description: m.description,
        })),
        walks: entry.walks.map((w) => ({
          startTime: w.startTime,
          durationMinutes: w.durationMinutes,
          distance: w.distance?.toString() ?? '',
          notes: w.notes ?? '',
        })),
        stressRecords: entry.stressRecords.map((s) => ({
          time: s.time,
          level: s.level,
          reason: s.reason ?? '',
        })),
        wellbeing: {
          energy: entry.wellbeing?.energy ?? undefined,
          mood: entry.wellbeing?.mood ?? undefined,
          pain: entry.wellbeing?.pain ?? undefined,
          sleepHours: entry.wellbeing?.sleepHours?.toString() ?? '',
          weight: entry.wellbeing?.weight?.toString() ?? '',
          bloodPressure: entry.wellbeing?.bloodPressure ?? '',
          heartRate: entry.wellbeing?.heartRate?.toString() ?? '',
          temperature: entry.wellbeing?.temperature?.toString() ?? '',
          notes: entry.wellbeing?.notes ?? '',
        },
      }
    : {
        date: date,
        medications: [],
        meals: [],
        walks: [],
        stressRecords: [],
        wellbeing: {
          energy: undefined,
          mood: undefined,
          pain: undefined,
          sleepHours: '',
          weight: '',
          bloodPressure: '',
          heartRate: '',
          temperature: '',
          notes: '',
        },
      }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DayFormInput>({
    resolver: zodResolver(DayFormSchema),
    defaultValues,
  })

  const medicationsArray = useFieldArray({ control, name: 'medications' })
  const mealsArray = useFieldArray({ control, name: 'meals' })
  const walksArray = useFieldArray({ control, name: 'walks' })
  const stressArray = useFieldArray({ control, name: 'stressRecords' })

  function onSubmit(data: DayFormInput) {
    startTransition(async () => {
      const result = await saveDayEntry(data)
      if (result.success) {
        showToast('success', 'Сохранено', 'Запись успешно сохранена')
        router.push(`/day/${result.data.id}`)
      } else {
        showToast('error', 'Ошибка', result.error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <PageHeader
        title={isEditing ? 'Редактирование записи' : 'Новая запись'}
        subtitle={date}
        action={
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isPending}
            leftIcon={<Save size={18} />}
          >
            Сохранить
          </Button>
        }
      />

      <input type="hidden" {...register('date')} />

      <div className={styles.sections}>
        <MedicationSection
          fieldArray={medicationsArray}
          register={register}
          errors={errors.medications}
        />

        <MealSection
          fieldArray={mealsArray}
          register={register}
          errors={errors.meals}
          control={control}
        />

        <WalkSection
          fieldArray={walksArray}
          register={register}
          errors={errors.walks}
        />

        <StressSection
          fieldArray={stressArray}
          register={register}
          errors={errors.stressRecords}
          control={control}
          setValue={setValue}
          watch={watch}
        />

        <WellbeingSection
          register={register}
          errors={errors.wellbeing}
          control={control}
          setValue={setValue}
          watch={watch}
        />
      </div>
    </form>
  )
}

export { DayForm }
