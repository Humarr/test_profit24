// lib/bots.ts
import prisma from '@/lib/prisma'

export async function getAllBots() {
  return await prisma.bot.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}
