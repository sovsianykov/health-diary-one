'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Calendar, BarChart3, Plus } from 'lucide-react'
import clsx from 'clsx'
import styles from './layout.module.scss'

function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Календарь', icon: Calendar },
    { href: '/stats', label: 'Статистика', icon: BarChart3 },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>
          <Heart size={24} className={styles.logoIcon} />
          <span className={styles.logoText}>Дневник здоровья</span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                styles.navLink,
                pathname === link.href && styles.navLinkActive
              )}
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <Link href="/day/new" className={styles.newEntryButton}>
          <Plus size={18} />
          <span className={styles.newEntryText}>Новая запись</span>
        </Link>
      </div>
    </header>
  )
}

export { Header }
