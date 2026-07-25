'use client'

import type { UseFieldArrayReturn, UseFormRegister, FieldErrors } from 'react-hook-form'
import { Plus, Trash2, Pill } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { z } from 'zod'
import type { DayFormSchema } from '@/validators'
import styles from './day-form.module.scss'

type FormData = z.infer<typeof DayFormSchema>

interface MedicationSectionProps {
  fieldArray: UseFieldArrayReturn<FormData, 'medications'>
  register: UseFormRegister<FormData>
  errors?: FieldErrors<FormData>['medications']
}

function MedicationSection({ fieldArray, register, errors }: MedicationSectionProps) {
  const { fields, append, remove } = fieldArray

  return (
    <Card accent="medication">
      <Card.Header
        title="Лекарства"
        subtitle={`${fields.length} записей`}
        icon={<Pill size={20} />}
        action={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={() =>
              append({ name: '', takenAt: '', dosage: '', notes: '' })
            }
          >
            Добавить
          </Button>
        }
      />
      <Card.Body>
        {fields.length === 0 ? (
          <p className={styles.emptyHint}>Нажмите «Добавить», чтобы записать принятые лекарства</p>
        ) : (
          <div className={styles.fieldList}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.fieldRow}>
                <div className={styles.fieldGrid}>
                  <Input
                    label="Название"
                    placeholder="Аспирин"
                    error={errors?.[index]?.name?.message}
                    {...register(`medications.${index}.name`)}
                  />
                  <Input
                    label="Время приёма"
                    type="time"
                    error={errors?.[index]?.takenAt?.message}
                    {...register(`medications.${index}.takenAt`)}
                  />
                  <Input
                    label="Дозировка"
                    placeholder="500 мг"
                    error={errors?.[index]?.dosage?.message}
                    {...register(`medications.${index}.dosage`)}
                  />
                  <Input
                    label="Заметки"
                    placeholder="После еды"
                    error={errors?.[index]?.notes?.message}
                    {...register(`medications.${index}.notes`)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={styles.removeButton}
                  onClick={() => remove(index)}
                  aria-label="Удалить лекарство"
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

export { MedicationSection }
