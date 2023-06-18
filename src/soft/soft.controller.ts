import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Admin } from 'src/auth/admin.decorator'
import { CreateSoftDto } from './dto/create-soft.dto'
import { UpdateSoftDto } from './dto/update-soft.dto'
import { SoftService } from './soft.service'
import { CheckUpdateDto } from './dto/check-update.dto'

@Controller('soft')
export class SoftController {
  constructor(private readonly softService: SoftService) {}

  @Post()
  @Admin()
  create(@Body() createSoftDto: CreateSoftDto) {
    return this.softService.create(createSoftDto)
  }

  @Get()
  findAll() {
    return this.softService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.softService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSoftDto: UpdateSoftDto) {
    return this.softService.update(+id, updateSoftDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softService.remove(+id)
  }

  @Post('checkUpdate')
  //软件更新检测
  checkUpdate(@Body() dto: CheckUpdateDto) {
    const soft = this.softService.checkUpdate(dto)
    return soft
  }
}
