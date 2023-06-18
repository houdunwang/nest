import { Global, Module } from '@nestjs/common'
import { SoftService } from './soft.service'
import { SoftController } from './soft.controller'

@Global()
@Module({
  controllers: [SoftController],
  providers: [SoftService],
  exports: [SoftService],
})
export class SoftModule {}
