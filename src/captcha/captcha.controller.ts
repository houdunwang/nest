import { Controller, Get } from '@nestjs/common'
import { CaptchaService } from './captcha.service'

@Controller('core/captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get()
  async create() {
    return this.captchaService.create()
  }
}
