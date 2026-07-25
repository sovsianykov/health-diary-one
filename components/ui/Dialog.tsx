'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import clsx from 'clsx'
import styles from './Dialog.module.scss'

function Dialog({ children, ...props }: DialogPrimitive.DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
}

function DialogTrigger({ children, ...props }: DialogPrimitive.DialogTriggerProps) {
  return <DialogPrimitive.Trigger asChild {...props}>{children}</DialogPrimitive.Trigger>
}

function DialogContent({
  children,
  title,
  description,
  className,
}: {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content className={clsx(styles.content, className)}>
        <div className={styles.header}>
          <div>
            <DialogPrimitive.Title className={styles.title}>
              {title}
            </DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className={styles.description}>
                {description}
              </DialogPrimitive.Description>
            )}
          </div>
          <DialogPrimitive.Close className={styles.close} aria-label="Закрыть">
            <X size={18} />
          </DialogPrimitive.Close>
        </div>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

function DialogFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={clsx(styles.footer, className)}>{children}</div>
}

Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
Dialog.Footer = DialogFooter
Dialog.Close = DialogPrimitive.Close

export { Dialog }
