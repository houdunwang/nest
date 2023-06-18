import { Allow, IsNotEmpty, Length, Matches } from 'class-validator'
import { IsConfirmed } from 'src/validate/is-confirmed'
import { IsNotExists } from 'src/validate/is-not-exists'

export class RegisterDto {
  @IsNotEmpty({ message: '帐号不能为空' })
  @IsNotExists('user', ['name'], { message: '帐号已经存在' })
  @Matches(/[a-z]{3,20}/i, { message: '请输入3~20数量的字母' })
  name: string

  @IsNotEmpty()
  @Length(3, 20, { message: '密码长度为3~20' })
  @IsConfirmed({ message: '两次密码不一致' })
  password: string

  @Allow()
  captcha: object
}
