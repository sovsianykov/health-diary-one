import { forwardRef } from 'react'
import clsx from 'clsx'
import styles from './Input.module.scss'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, rows = 3, ...props }, ref) => {
    const inputId = id ?? `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={clsx(
            styles.input,
            styles.textarea,
            error && styles.hasError,
            className
          )}
          {...props}
        />
        {hint && !error && <p className={styles.hint}>{hint}</p>}
        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
