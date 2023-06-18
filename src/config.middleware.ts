import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ConfigMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}
  async use(req: any, res: any, next: () => void) {
    next()
  }
}
