import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { EnumService } from './enum.service';
import { UpdateEnumDto } from './dto/update-enum.dto';
import { CreateEnumTypeDto } from './dto/createType-enum.dto';
import { AuthGuard } from '@nestjs/passport';
import { EnumEntity } from './entities/enum.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('enum')
@ApiTags('枚举')
@UseGuards(AuthGuard('jwt')) // 验证token/**/
export class EnumController {
  constructor(private readonly enumService: EnumService) {}

  @Post('createType')
  @ApiOperation({ summary: '创建type' })
  @HttpCode(HttpStatus.OK)
  createType(@Body() EnumTypeEntity: CreateEnumTypeDto) {
    return this.enumService.createType(EnumTypeEntity);
  }
  @Delete('deleteType')
  @ApiOperation({ summary: '删除type' })
  @HttpCode(HttpStatus.OK)
  deleteType(@Query('id') id: string) {
    return this.enumService.deleteType(id);
  }

  @Put('updateEnumType')
  @ApiOperation({ summary: '更新' })
  @HttpCode(HttpStatus.OK)
  updateEnumType(@Body() EnumTypeEntity: CreateEnumTypeDto) {
    return this.enumService.updateEnumType(EnumTypeEntity);
  }

  @Post()
  create(@Body() EnumEntity: EnumEntity) {
    return this.enumService.create(EnumEntity);
  }

  @Get()
  findAll() {
    return this.enumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnumDto: UpdateEnumDto) {
    return this.enumService.update(+id, updateEnumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enumService.remove(+id);
  }
}
