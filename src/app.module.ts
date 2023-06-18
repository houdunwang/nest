import { CacheModule } from '@nestjs/cache-manager'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { config } from 'config'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'
import { ConfigMiddleware } from './config.middleware'
import { NotificationModule } from './notification/notification.module'
import { PolicyModule } from './policy/policy.module'
import { PrismaModule } from './prisma/prisma.module'
import { SoftModule } from './soft/soft.module'
import { UploadModule } from './upload/upload.module'
import { UserModule } from './user/user.module'
import { CaptchaModule } from './captcha/captcha.module'
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SoftModule,
    UserModule,
    UploadModule,
    CommentModule,
    PolicyModule,
    NotificationModule,
    CacheModule.register({
      ttl: 60000,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    CaptchaModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ConfigMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
