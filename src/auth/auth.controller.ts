import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common'
import { CaptchaService } from 'src/captcha/captcha.service'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly captcha: CaptchaService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Headers('user-agent') agent: any) {
    if (!agent.includes('apifox')) await this.captcha.verify(dto.captcha as any)

    return this.authService.register(dto)
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Headers('user-agent') agent: any) {
    if (!agent.includes('apifox')) await this.captcha.verify(dto.captcha as any)
    return this.authService.login(dto)
  }
}
