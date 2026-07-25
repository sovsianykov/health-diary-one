import clsx from 'clsx'
import styles from './Badge.module.scss'

type BadgeVariant = 'default' | 'medication' | 'meal' | 'walk' | 'stress' | 'wellbeing' | 'success' | 'warning' | 'danger'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[variant], className)}>
      {children}
    </span>
  )
}

export { Badge }
