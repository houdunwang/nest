import { PrismaClient } from '@prisma/client'
import { Random } from 'mockjs'
const prisma = new PrismaClient()

export const soft = async () => {
  for (let i = 1; i < 30; i++) {
    const res = await prisma.soft.create({
      data: {
        title: Random.csentence(),
        name: Random.word(),
        version: '1.0.5',
        content: Random.cparagraph(),
        preview: Random.image('800x450'),
        description: Random.cparagraph(),
        comments: {
          create: {
            content: Random.csentence(),
            user: { connect: { id: i } },
          },
        },
      },
    })
    //回复
    await prisma.soft.create({
      data: {
        title: Random.csentence(),
        name: Random.word(),
        version: '1.0.5',
        content: Random.cparagraph(),
        preview: Random.image('800x450'),
        description: Random.cparagraph(),
        comments: {
          create: {
            content: Random.csentence(),
            user: { connect: { id: i } },
            comment: { connect: { id: res.id } },
          },
        },
      },
    })
  }
}
