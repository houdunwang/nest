import { user } from './../../prisma/seed/user'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { NotificationService } from 'src/notification/notification.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCommentDto } from './dto/create-comment.dto'
export type IComment = Comment & {
  user: User
  replys: (Comment & {
    user: User
  })[]
}

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService, private notification: NotificationService) {}

  async create(dto: CreateCommentDto, user: User, sid: number) {
    const { commentId, ...data } = dto
    const comment = await this.prisma.comment.create({
      data: {
        ...data,
        soft: { connect: { id: sid } },
        user: { connect: { id: user.id } },
        comment: commentId && { connect: { id: +commentId } },
      },
      include: { user: true, replys: { include: { user: true } }, comment: { include: { user: true } } },
    })

    //站内通知
    if (comment.comment) {
      await this.notification.create(comment, comment.comment.user)
      await this.notification.create(comment, await this.prisma.user.findUnique({ where: { id: 1 } }))
    }
    return comment
  }

  findAll(sid: number) {
    return this.prisma.comment.findMany({
      where: { softId: sid, AND: { commentId: null } },
      include: { user: true, replys: { include: { user: true } } },
    })
  }

  remove(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    })
  }
}
