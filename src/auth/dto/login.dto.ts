import { PickType } from '@nestjs/mapped-types'
import { Allow, IsNotEmpty, Length } from 'class-validator'
import { IsExists } from 'src/validate/is-exists'
import { RegisterDto } from './register.dto'

export class LoginDto extends PickType(RegisterDto, []) {
  @IsNotEmpty({ message: '帐号不能为空' })
  @IsExists('user', ['name', 'email', 'mobile'], { message: '帐号不存在' })
  name: string

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(3, 20, { message: '密码长度为3~20' })
  password: string

  @Allow()
  captcha: object
  // @Allow()
  // captcha_key: string

  // @Allow()
  // captcha_value: string
}
