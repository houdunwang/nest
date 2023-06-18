import { User } from '@prisma/client'
import { Response } from 'src/response/response'

export class UserResponse extends Response<User> {
  protected hidden: (keyof User)[] = ['password']

  public make(): User {
    const user = super.make()
    if (!user) return user
    user.nickname = user.nickname || '盾友'
    user.avatar = user.avatar ? user.avatar : '/public/assets/avatar.jpeg'
    return user
  }
}
