import { Allow, IsNotEmpty, Length } from 'class-validator'

export class CreateCommentDto {
  @IsNotEmpty({ message: '评论不能为空' })
  content: string

  @Allow()
  commentId?: number
}
