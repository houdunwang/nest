import _ from 'lodash'
import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateSoftDto } from './dto/create-soft.dto'
import { UpdateSoftDto } from './dto/update-soft.dto'
import { CheckUpdateDto } from './dto/check-update.dto'
import dayjs from 'dayjs'
@Injectable()
export class SoftService {
  constructor(private prisma: PrismaService, @Inject(REQUEST) private req: Request) {}

  async create(dto: CreateSoftDto) {
    return this.prisma.soft.create({
      data: { ...dto },
    })
  }

  async findAll() {
    const page = +this.req.query.page || 1
    const row = 10
    const data = await this.prisma.soft.findMany({
      skip: (page - 1) * row,
      take: row,
      orderBy: { id: 'desc' },
    })

    const total = await this.prisma.soft.count()
    return { meta: { page, page_num: Math.ceil(total / row), total, row }, data }
  }

  findOne(id: number) {
    return this.prisma.soft.findFirst({
      where: { id },
    })
  }

  update(id: number, data: UpdateSoftDto) {
    return this.prisma.soft.update({
      where: { id },
      data: _.omit(data, 'updatedAt'),
    })
  }

  remove(id: number) {
    return this.prisma.soft.deleteMany({
      where: { id },
    })
  }

  //根据软件标识获取软件
  async getByName(name: string) {
    return await this.prisma.soft.findFirst({
      where: { name },
    })
  }

  //软件更新检测
  async checkUpdate(dto: CheckUpdateDto) {
    console.log(dto)
    const soft = await this.prisma.soft.findFirst({
      where: {
        name: dto.name,
        version: {
          gt: dto.version,
        },
      },
    })
    return soft ? 1 : 0
  }
}
