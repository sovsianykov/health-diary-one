import { PrismaClient } from '@prisma/client'

/**
 * Prisma singleton client.
 *
 * In development, Next.js clears module cache on hot reload, which would
 * create a new PrismaClient on every reload — eventually exhausting DB connections.
 * By storing the instance on globalThis, we reuse the same client across reloads.
 *
 * In production, module cache is persistent, so a simple module-level singleton suffices.
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
