import clsx from 'clsx'
import styles from './Card.module.scss'

interface CardProps {
  className?: string
  children: React.ReactNode
  accent?: 'medication' | 'meal' | 'walk' | 'stress' | 'wellbeing' | 'none'
  noPadding?: boolean
}

function Card({ className, children, accent = 'none', noPadding = false }: CardProps) {
  return (
    <div
      className={clsx(
        styles.card,
        accent !== 'none' && styles[`accent-${accent}`],
        noPadding && styles.noPadding,
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

function CardHeader({ title, subtitle, icon, action, className }: CardHeaderProps) {
  return (
    <div className={clsx(styles.header, className)}>
      <div className={styles.headerLeft}>
        {icon && <span className={styles.headerIcon}>{icon}</span>}
        <div>
          <h3 className={styles.headerTitle}>{title}</h3>
          {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
        </div>
      </div>
      {action && <div className={styles.headerAction}>{action}</div>}
    </div>
  )
}

function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx(styles.body, className)}>{children}</div>
}

function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx(styles.footer, className)}>{children}</div>
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export { Card }
