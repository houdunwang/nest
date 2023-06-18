import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@prisma/client'
import { Request } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'
import { IPolicyClass, POLICY_KEY } from './policy.decorator'

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request
    const user = request.user as User
    //超管放行
    if (user.id == 1) return true
    return this.check(context, request)
  }

  //权限校验
  async check(context: ExecutionContext, request: Request) {
    const { policy, table, action } = this.reflector.get<{ policy: IPolicyClass; table: string; action: string }>(
      POLICY_KEY,
      context.getHandler(),
    )
    //根据控制器包获取mysql表名
    const tableName = table || context.getClass().name.replace('Controller', '')
    //根据控制器获取policy方法名
    const method = action || context.getHandler().name
    const model = await this.prisma[tableName].findUnique({ where: { id: +(request.params.id || 0) } })

    const instance = new policy(this.prisma, request)
    return instance[method](model, request.user)
  }
}
