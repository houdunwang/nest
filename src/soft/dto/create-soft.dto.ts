import { IsNotEmpty } from 'class-validator'
import { IsNotExists } from 'src/validate/is-not-exists'

export class CreateSoftDto {
  @IsNotEmpty({ message: '标题不能为空' })
  title: string

  @IsNotEmpty({ message: '软件标识不能为空' })
  @IsNotExists('soft', ['name'], { message: '标识已经存在' })
  name: string

  @IsNotEmpty({ message: '内容介绍不能为空' })
  content: string

  @IsNotEmpty({ message: '请上传预览图' })
  preview: string

  @IsNotEmpty({ message: '简短介绍不能为空' })
  description: string
}
