'use client'

import type {
  UseFieldArrayReturn,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
  Control,
} from 'react-hook-form'
import { useController } from 'react-hook-form'
import { Plus, Trash2, Brain } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Slider } from '@/components/ui/Slider'
import { Button } from '@/components/ui/Button'
import type { z } from 'zod'
import type { DayFormSchema } from '@/validators'
import styles from './day-form.module.scss'

type FormData = z.infer<typeof DayFormSchema>

interface StressLevelSliderProps {
  control: Control<FormData>
  index: number
}

function StressLevelSlider({ control, index }: StressLevelSliderProps) {
  const { field } = useController({
    control,
    name: `stressRecords.${index}.level`,
  })

  return (
    <Slider
      label="Уровень стресса"
      value={field.value}
      onValueChange={field.onChange}
      min={1}
      max={10}
    />
  )
}

interface StressSectionProps {
  fieldArray: UseFieldArrayReturn<FormData, 'stressRecords'>
  register: UseFormRegister<FormData>
  errors?: FieldErrors<FormData>['stressRecords']
  control: Control<FormData>
  setValue: UseFormSetValue<FormData>
  watch: UseFormWatch<FormData>
}

function StressSection({ fieldArray, register, errors, control }: StressSectionProps) {
  const { fields, append, remove } = fieldArray

  return (
    <Card accent="stress">
      <Card.Header
        title="Стресс"
        subtitle={`${fields.length} записей`}
        icon={<Brain size={20} />}
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={() => append({ time: '', level: 5, reason: '' })}
          >
            Добавить
          </Button>
        }
      />
      <Card.Body>
        {fields.length === 0 ? (
          <p className={styles.emptyHint}>Нажмите «Добавить», чтобы записать уровень стресса</p>
        ) : (
          <div className={styles.fieldList}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.fieldRow}>
                <div className={styles.fieldGrid}>
                  <Input
                    label="Время"
                    type="time"
                    error={errors?.[index]?.time?.message}
                    {...register(`stressRecords.${index}.time`)}
                  />
                  <div className={styles.fullWidth}>
                    <StressLevelSlider control={control} index={index} />
                  </div>
                  <div className={styles.fullWidth}>
                    <Input
                      label="Причина"
                      placeholder="Совещание, дедлайн..."
                      error={errors?.[index]?.reason?.message}
                      {...register(`stressRecords.${index}.reason`)}
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={styles.removeButton}
                  onClick={() => remove(index)}
                  aria-label="Удалить запись стресса"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export { StressSection }
