'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import clsx from 'clsx'
import styles from './Separator.module.scss'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
  decorative?: boolean
}

function Separator({
  orientation = 'horizontal',
  className,
  decorative = true,
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      decorative={decorative}
      className={clsx(styles.separator, styles[orientation], className)}
    />
  )
}

export { Separator }
