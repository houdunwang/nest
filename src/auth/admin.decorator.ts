import { CanActivate, ExecutionContext, Injectable, UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Observable } from 'rxjs'

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user as User
    return user && +user.id == 1
  }
}

export function Admin() {
  return applyDecorators(UseGuards(AuthGuard('jwt'), AdminGuard))
}
