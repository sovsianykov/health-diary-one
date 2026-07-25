'use client'

import type { UseFieldArrayReturn, UseFormRegister, FieldErrors } from 'react-hook-form'
import { Plus, Trash2, Footprints } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { z } from 'zod'
import type { DayFormSchema } from '@/validators'
import styles from './day-form.module.scss'

type FormData = z.infer<typeof DayFormSchema>

interface WalkSectionProps {
  fieldArray: UseFieldArrayReturn<FormData, 'walks'>
  register: UseFormRegister<FormData>
  errors?: FieldErrors<FormData>['walks']
}

function WalkSection({ fieldArray, register, errors }: WalkSectionProps) {
  const { fields, append, remove } = fieldArray

  return (
    <Card accent="walk">
      <Card.Header
        title="Прогулки"
        subtitle={`${fields.length} записей`}
        icon={<Footprints size={20} />}
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={() =>
              append({ startTime: '', durationMinutes: 30, distance: '', notes: '' })
            }
          >
            Добавить
          </Button>
        }
      />
      <Card.Body>
        {fields.length === 0 ? (
          <p className={styles.emptyHint}>Нажмите «Добавить», чтобы записать прогулку</p>
        ) : (
          <div className={styles.fieldList}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.fieldRow}>
                <div className={styles.fieldGrid}>
                  <Input
                    label="Начало"
                    type="time"
                    error={errors?.[index]?.startTime?.message}
                    {...register(`walks.${index}.startTime`)}
                  />
                  <Input
                    label="Длительность (мин)"
                    type="number"
                    min={1}
                    error={errors?.[index]?.durationMinutes?.message}
                    {...register(`walks.${index}.durationMinutes`, {
                      valueAsNumber: true,
                    })}
                  />
                  <Input
                    label="Расстояние (км)"
                    placeholder="2.5"
                    error={errors?.[index]?.distance?.message}
                    {...register(`walks.${index}.distance`)}
                  />
                  <Input
                    label="Заметки"
                    placeholder="Парк, хорошая погода"
                    error={errors?.[index]?.notes?.message}
                    {...register(`walks.${index}.notes`)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={styles.removeButton}
                  onClick={() => remove(index)}
                  aria-label="Удалить прогулку"
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

export { WalkSection }
