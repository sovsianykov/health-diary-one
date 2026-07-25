'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import clsx from 'clsx'
import styles from './Slider.module.scss'

interface SliderProps {
  label?: string
  value?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showValue?: boolean
  error?: string
  className?: string
  id?: string
}

function Slider({
  label,
  value,
  onValueChange,
  min = 1,
  max = 10,
  step = 1,
  disabled = false,
  showValue = true,
  error,
  className,
  id,
}: SliderProps) {
  const sliderId = id ?? `slider-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={clsx(styles.wrapper, className)}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && (
            <label htmlFor={sliderId} className={styles.label}>
              {label}
            </label>
          )}
          {showValue && value != null && (
            <span className={styles.value}>
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        id={sliderId}
        className={styles.root}
        value={value != null ? [value] : undefined}
        onValueChange={(vals) => onValueChange?.(vals[0])}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      >
        <SliderPrimitive.Track className={styles.track}>
          <SliderPrimitive.Range className={styles.range} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={styles.thumb}
          aria-label={label}
        />
      </SliderPrimitive.Root>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  )
}

export { Slider }
