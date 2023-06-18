import { Controller, Delete, Get, Param } from '@nestjs/common'
import { User } from '@prisma/client'
import { Auth } from 'src/auth/auth.decorator'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { NotificationService } from './notification.service'
import { NotificationResponse } from './notification.response'

@Controller('notification')
@Auth()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @Auth()
  async findAll(@CurrentUser() user: User) {
    const notifications = await this.notificationService.findAll(user)
    return notifications.map((notification) => {
      return new NotificationResponse(notification).make()
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id)
  }
}
