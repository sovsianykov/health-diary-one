'use client'

import type {
  UseFieldArrayReturn,
  UseFormRegister,
  FieldErrors,
  Control,
} from 'react-hook-form'
import { useController } from 'react-hook-form'
import { Plus, Trash2, UtensilsCrossed } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import type { z } from 'zod'
import type { DayFormSchema } from '@/validators'
import styles from './day-form.module.scss'

type FormData = z.infer<typeof DayFormSchema>

const MEAL_OPTIONS = [
  { value: 'breakfast', label: 'Завтрак' },
  { value: 'lunch', label: 'Обед' },
  { value: 'dinner', label: 'Ужин' },
  { value: 'snack', label: 'Перекус' },
]

interface MealSectionProps {
  fieldArray: UseFieldArrayReturn<FormData, 'meals'>
  register: UseFormRegister<FormData>
  errors?: FieldErrors<FormData>['meals']
  control: Control<FormData>
}

function MealTypeSelect({
  control,
  index,
  error,
}: {
  control: Control<FormData>
  index: number
  error?: string
}) {
  const { field } = useController({
    control,
    name: `meals.${index}.type`,
  })

  return (
    <Select
      label="Тип"
      options={MEAL_OPTIONS}
      value={field.value}
      onValueChange={field.onChange}
      error={error}
    />
  )
}

function MealSection({ fieldArray, register, errors, control }: MealSectionProps) {
  const { fields, append, remove } = fieldArray

  return (
    <Card accent="meal">
      <Card.Header
        title="Питание"
        subtitle={`${fields.length} записей`}
        icon={<UtensilsCrossed size={20} />}
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={() =>
              append({ time: '', type: 'breakfast', description: '' })
            }
          >
            Добавить
          </Button>
        }
      />
      <Card.Body>
        {fields.length === 0 ? (
          <p className={styles.emptyHint}>Нажмите «Добавить», чтобы записать приём пищи</p>
        ) : (
          <div className={styles.fieldList}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.fieldRow}>
                <div className={styles.fieldGrid}>
                  <Input
                    label="Время"
                    type="time"
                    error={errors?.[index]?.time?.message}
                    {...register(`meals.${index}.time`)}
                  />
                  <MealTypeSelect
                    control={control}
                    index={index}
                    error={errors?.[index]?.type?.message}
                  />
                  <div className={styles.fullWidth}>
                    <Input
                      label="Описание"
                      placeholder="Овсянка с ягодами"
                      error={errors?.[index]?.description?.message}
                      {...register(`meals.${index}.description`)}
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={styles.removeButton}
                  onClick={() => remove(index)}
                  aria-label="Удалить приём пищи"
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

export { MealSection }
