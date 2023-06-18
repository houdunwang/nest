import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { Auth } from 'src/auth/auth.decorator'
import { PrismaService } from 'src/prisma/prisma.service'
import { PolicyGuard } from './policy.guard'

export interface IPolicy {}
export interface IPolicyClass {
  new (prisma: PrismaService, request: Request): IPolicy
}
export const POLICY_KEY = 'policy_key'

export function Policy(policy: IPolicyClass, table?: keyof PrismaClient, action?: string) {
  return applyDecorators(Auth(), SetMetadata(POLICY_KEY, { policy, table, action }), UseGuards(PolicyGuard))
}
