import { Controller, Post, Req, UploadedFile } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { Uploader } from './uploader.decorator'

@Controller('upload')
export class UploadController {
  constructor(private readonly config: ConfigService) {}

  @Post('image')
  @Uploader('image')
  image(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return { url: this.config.get('host') + '/' + file.path }
  }
}
