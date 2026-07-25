'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, BarChart3, PlusCircle } from 'lucide-react'
import clsx from 'clsx'
import styles from './layout.module.scss'

function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Календарь', icon: Calendar },
    { href: '/day/new', label: 'Добавить', icon: PlusCircle },
    { href: '/stats', label: 'Статистика', icon: BarChart3 },
  ]

  return (
    <nav className={styles.mobileNav}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            styles.mobileNavLink,
            pathname === link.href && styles.mobileNavLinkActive
          )}
        >
          <link.icon size={20} />
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export { Navigation }
