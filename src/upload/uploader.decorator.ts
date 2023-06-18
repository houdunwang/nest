import { UnsupportedMediaTypeException, UseInterceptors, applyDecorators } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'

export function Uploader(mime: 'image', field: string = 'file') {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(field, {
        limits: {
          fileSize: Math.pow(1024, 2) * 2,
        },
        fileFilter(req: Request, file: Express.Multer.File, callback) {
          if (!file.mimetype.includes(mime)) {
            callback(new UnsupportedMediaTypeException('文件类型错误'), false)
          }
          callback(null, true)
        },
      }),
    ),
  )
}
