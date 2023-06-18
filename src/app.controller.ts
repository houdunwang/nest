import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
  constructor(private config: ConfigService) {}

  @Get()
  getHello() {
    return this.config.get('name')
  }
}
