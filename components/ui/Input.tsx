import { forwardRef } from 'react'
import clsx from 'clsx'
import styles from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(styles.input, error && styles.hasError, className)}
          {...props}
        />
        {hint && !error && <p className={styles.hint}>{hint}</p>}
        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
