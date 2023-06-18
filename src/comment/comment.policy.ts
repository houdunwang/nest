import { Comment, User } from '@prisma/client'
import { Request } from 'express'
import { IPolicy } from 'src/policy/policy.decorator'
import { PrismaService } from 'src/prisma/prisma.service'

export class CommentPolicy implements IPolicy {
  constructor(private prisma: PrismaService, private request: Request) {}

  async remove(comment: Comment, user: User) {
    return comment.userId == user.id
  }
}
