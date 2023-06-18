import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { User } from '@prisma/client'
import { Auth } from 'src/auth/auth.decorator'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { Policy } from 'src/policy/policy.decorator'
import { CommentPolicy } from './comment.policy'
import { CommentResponse } from './comment.response'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('comment/:sid')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @Auth()
  @Throttle(1, 20)
  async create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: User, @Param('sid') sid: number) {
    const comment = await this.commentService.create(createCommentDto, user, sid)
    return new CommentResponse(comment as any).make()
  }

  @Get()
  async findAll(@Param('sid') sid: number) {
    const comments = await this.commentService.findAll(sid)
    return comments.map((comment) => new CommentResponse(comment as any).make())
  }

  @Delete(':id')
  @Policy(CommentPolicy, 'user')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id)
  }
}
