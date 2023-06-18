import { user } from './../../prisma/seed/user'
import { Response } from 'src/response/response'
import { UserResponse } from 'src/user/user.response'

export class NotificationResponse extends Response<any> {
  public make() {
    const notification = super.make()
    notification.user = new UserResponse(notification.comment.user, ['id', 'avatar', 'nickname']).make()
    return notification
  }
}
