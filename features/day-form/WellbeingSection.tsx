'use client'

import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
  Control,
} from 'react-hook-form'
import { useController } from 'react-hook-form'
import { Activity } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Slider } from '@/components/ui/Slider'
import { Separator } from '@/components/ui/Separator'
import type { z } from 'zod'
import type { DayFormSchema } from '@/validators'
import styles from './day-form.module.scss'

type FormData = z.infer<typeof DayFormSchema>

interface MetricSliderProps {
  control: Control<FormData>
  name: `wellbeing.${'energy' | 'mood' | 'pain'}`
  label: string
}

function MetricSlider({ control, name, label }: MetricSliderProps) {
  const { field } = useController({ control, name })

  return (
    <Slider
      label={label}
      value={field.value as number | undefined}
      onValueChange={field.onChange}
      min={1}
      max={10}
    />
  )
}

interface WellbeingSectionProps {
  register: UseFormRegister<FormData>
  errors?: FieldErrors<FormData>['wellbeing']
  control: Control<FormData>
  setValue: UseFormSetValue<FormData>
  watch: UseFormWatch<FormData>
}

function WellbeingSection({ register, errors, control }: WellbeingSectionProps) {
  return (
    <Card accent="wellbeing">
      <Card.Header
        title="Самочувствие"
        subtitle="Ежедневная оценка"
        icon={<Activity size={20} />}
      />
      <Card.Body>
        <div className={styles.wellbeingGrid}>
          {/* Subjective metrics — sliders */}
          <div className={styles.sliderGroup}>
            <MetricSlider control={control} name="wellbeing.mood" label="Настроение" />
            <MetricSlider control={control} name="wellbeing.energy" label="Энергия" />
            <MetricSlider control={control} name="wellbeing.pain" label="Боль" />
          </div>

          <Separator />

          {/* Objective metrics — text inputs */}
          <div className={styles.fieldGrid}>
            <Input
              label="Сон (часы)"
              placeholder="7.5"
              error={errors?.sleepHours?.message}
              {...register('wellbeing.sleepHours')}
            />
            <Input
              label="Вес (кг)"
              placeholder="70.5"
              error={errors?.weight?.message}
              {...register('wellbeing.weight')}
            />
            <Input
              label="Давление"
              placeholder="120/80"
              error={errors?.bloodPressure?.message}
              {...register('wellbeing.bloodPressure')}
            />
            <Input
              label="Пульс (уд/мин)"
              placeholder="72"
              error={errors?.heartRate?.message}
              {...register('wellbeing.heartRate')}
            />
            <Input
              label="Температура (°C)"
              placeholder="36.6"
              error={errors?.temperature?.message}
              {...register('wellbeing.temperature')}
            />
          </div>

          <Separator />

          <Textarea
            label="Заметки"
            placeholder="Общее самочувствие, комментарии..."
            error={errors?.notes?.message}
            {...register('wellbeing.notes')}
          />
        </div>
      </Card.Body>
    </Card>
  )
}

export { WellbeingSection }
