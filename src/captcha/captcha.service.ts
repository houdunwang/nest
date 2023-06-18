import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Cache } from 'cache-manager'
import { Request } from 'express'
import { now } from 'lodash'
import md5 from 'md5'
import svgCaptcha from 'svg-captcha'

@Injectable()
export class CaptchaService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache, @Inject(REQUEST) private req: Request) {}

  async create() {
    const key = md5(now() + this.req.ip)
    const captcha = svgCaptcha.createMathExpr({
      mathMin: 1,
      mathMax: 9,
      mathOperator: '+',
      noise: 2,
      width: 120,
      height: 40,
      color: false,
    })
    await this.cache.set(key, captcha.text)
    return { key, svg: captcha.data }
  }

  //验证
  async verify({ key, value }) {
    const cacheCaptcha = await this.cache.get(key)
    if (cacheCaptcha == value) return true

    throw new BadRequestException('验证码输入错误')
  }
}
