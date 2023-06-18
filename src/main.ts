import { HttpStatus } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { SiteMiddleware } from './site.middleware'
import { ValidatePipe } from './validate/validate-pipe'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(
    new ValidatePipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
    }),
  )
  app.setGlobalPrefix('api')
  app.useStaticAssets('public', { prefix: '/public' })
  app.useStaticAssets('vue_dist', { prefix: '/vue_dist' })
  app.use(SiteMiddleware)
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
