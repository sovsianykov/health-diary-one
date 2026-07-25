import clsx from 'clsx'
import styles from './PageHeader.module.scss'
import Link from 'next/link'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  backHref?: string
  className?: string
}

function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div className={clsx(styles.header, className)}>
      <Link className={styles.text} href='/'>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </Link>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}

export { PageHeader }
