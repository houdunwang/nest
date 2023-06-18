import { Response } from 'src/response/response'
import { UserResponse } from 'src/user/user.response'
import { IComment } from './comment.service'

export class CommentResponse extends Response<IComment> {
  public make() {
    const comment = super.make()
    comment.user = new UserResponse(comment.user).make()
    if (comment.replys) {
      comment.replys = comment.replys.map((reply) => new CommentResponse(reply as any).make())
    }
    return comment
  }
}
