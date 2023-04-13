import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { EnumService } from './enum.service';
import { CreateEnumDto } from './dto/create-enum.dto';
import { CreateEnumTypeDto } from './dto/createType-enum.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('enum')
@ApiTags('枚举')
@UseGuards(AuthGuard('jwt')) // 验证token/**/
export class EnumController {
  constructor(private readonly enumService: EnumService) {}

  @Get('getEnumType')
  @ApiOperation({ summary: '获取type' })
  @HttpCode(HttpStatus.OK)
  getEnumType() {
    return this.enumService.getEnumType();
  }

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

  @Post('addEnum')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加枚举' })
  create(@Body() EnumEntitys: CreateEnumDto) {
    return this.enumService.create(EnumEntitys);
  }

  @Get('getEnum')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '根据id获取对应枚举对象' })
  getEnum(@Query('type') type: string) {
    return this.enumService.getEnum(type);
  }

  @Delete('deleteEnum')
  @ApiOperation({ summary: '单个删除枚举' })
  deleteTEnum(@Query('id') id: string) {
    return this.enumService.deleteTEnum(id);
  }

  @Put('updateEnum')
  @ApiOperation({ summary: '更新枚举' })
  @HttpCode(HttpStatus.OK)
  updateEnum(@Body() EnumEntity: CreateEnumDto) {
    return this.enumService.updateEnum(EnumEntity);
  }
}
