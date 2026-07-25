import clsx from 'clsx'
import styles from './StatCard.module.scss'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  color?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

function StatCard({ label, value, icon, color, trend, className }: StatCardProps) {
  return (
    <div
      className={clsx(styles.card, className)}
      style={color ? { '--stat-color': color } as React.CSSProperties : undefined}
    >
      {icon && (
        <div className={styles.iconWrapper}>
          {icon}
        </div>
      )}
      <div className={styles.content}>
        <span className={styles.value}>
          {value}
          {trend && trend !== 'neutral' && (
            <span className={clsx(styles.trend, styles[trend])}>
              {trend === 'up' ? '↑' : '↓'}
            </span>
          )}
        </span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  )
}

export { StatCard }
