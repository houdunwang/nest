import { IsNotEmpty } from 'class-validator'
import { IsNotExists } from 'src/validate/is-not-exists'

export class CheckUpdateDto {
  @IsNotEmpty({ message: '软件标识' })
  name: string

  @IsNotEmpty({ message: '版本号' })
  version: string
}
