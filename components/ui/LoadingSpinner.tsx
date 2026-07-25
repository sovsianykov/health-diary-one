import clsx from 'clsx'
import styles from './LoadingSpinner.module.scss'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

function LoadingSpinner({ size = 'md', label, className }: LoadingSpinnerProps) {
  return (
    <div className={clsx(styles.wrapper, className)} role="status" aria-label={label ?? 'Загрузка'}>
      <div className={clsx(styles.spinner, styles[size])} />
      {label && <span className={styles.label}>{label}</span>}
      <span className="sr-only">{label ?? 'Загрузка...'}</span>
    </div>
  )
}

export { LoadingSpinner }
