import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const notification = async () => {
  for (let i = 1; i < 30; i++) {
    await prisma.notification.create({
      data: {
        comment: { connect: { id: i } },
        user: { connect: { id: i } },
      },
    })
  }
}
