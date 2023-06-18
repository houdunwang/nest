import { Body, Controller, Get, Put } from '@nestjs/common'
import { User } from '@prisma/client'
import { Auth } from 'src/auth/auth.decorator'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserResponse } from './user.response'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @Auth()
  current(@CurrentUser() user: User) {
    return new UserResponse(user).make()
  }

  @Put()
  @Auth()
  async update(@Body() dto: UpdateUserDto, @CurrentUser() user: User) {
    return this.userService.update(user.id, dto)
  }

  @Put('password')
  @Auth()
  async password(@Body() dto: UpdatePasswordDto, @CurrentUser() user: User) {
    await this.userService.updatePassword(dto, user)
    return { message: '密码修改成功' }
  }
}
