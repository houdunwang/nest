import { PartialType } from '@nestjs/mapped-types'
import { CreateSoftDto } from './create-soft.dto'
import { IsNotEmpty } from 'class-validator'

export class UpdateSoftDto extends PartialType(CreateSoftDto) {
  @IsNotEmpty({ message: '软件标识不能为空' })
  name: string
}
