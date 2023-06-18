import { Injectable } from '@nestjs/common'
import { Comment, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
export interface INotification {
  model: string
  modelId: number
  attributes?: Record<string, any>
  fromUserId: number
  toUserId: number
}

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  create(comment: Comment, user: User) {
    return this.prisma.notification.create({
      data: {
        comment: { connect: { id: comment.id } },
        user: { connect: { id: user.id } },
      },
    })
  }

  findAll(user: User) {
    return this.prisma.notification.findMany({
      take: 10,
      where: {
        comment: { userId: user.id },
      },
      include: {
        comment: { include: { user: true } },
      },
    })
  }

  remove(id: number) {
    return this.prisma.notification.delete({
      where: {
        id,
      },
    })
  }
}
