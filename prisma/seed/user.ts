import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import md5 from 'md5'
import { Random } from 'mockjs'
import dayjs from 'dayjs'

const prisma = new PrismaClient()

export const user = async () => {
  for (let i = 0; i < 30; i++) {
    await prisma.user.create({
      data: {
        name: Random.name(),
        password: await hash('admin888'),
      },
    })
  }

  await prisma.user.update({
    where: {
      id: (await prisma.user.findFirst()).id,
    },
    data: {
      name: 'admin',
    },
  })
}
