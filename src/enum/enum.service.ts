import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEnumTypeDto } from './dto/createType-enum.dto';
import { Repository } from 'typeorm';
import { EnumTypeEntity } from './entities/enumType.entity';
import { EnumEntity } from './entities/enum.entity';
import { CreateEnumDto } from './dto/create-enum.dto';
@Injectable()
export class EnumService {
  constructor(
    @InjectRepository(EnumTypeEntity)
    private readonly EnumTypeService: Repository<CreateEnumTypeDto>,

    @InjectRepository(EnumEntity)
    private readonly EnumService: Repository<EnumEntity>,
  ) {}

  createType(post: Partial<CreateEnumTypeDto>) {
    return this.EnumTypeService.save(post);
  }
  getEnumType() {
    // 获取type
    return this.EnumTypeService.find();
  }
  async updateEnumType(post: Partial<CreateEnumTypeDto>) {
    const { id } = post;
    const existPost = await this.EnumTypeService.findOne({
      where: { id },
    });
    if (!existPost) {
      throw new HttpException(`id为${id}的类型不存在`, -1);
    }
    await this.EnumTypeService.update(id, post);
    return '更新成功';
  }
  async deleteType(id: string) {
    const existPost = await this.EnumTypeService.findOne({
      where: { id },
    });
    if (!existPost) {
      throw new HttpException(`id为${id}的类型不存在`, -1);
    }
    const enumData = await this.getEnum(id);
    const delIds = enumData.map((item) => item.id);
    if (delIds.length > 0) await this.EnumService.delete(delIds); // 删除枚举
    await this.EnumTypeService.remove(existPost); // 删除type
    return '删除成功';
  }
  async getEnum(id: string) {
    return await this.EnumService.find({
      where: { type_id: id },
    });
  }
  async create(createEnumDto: Partial<CreateEnumDto>) {
    const existPost = await this.EnumTypeService.findOne({
      where: { name: createEnumDto.type },
    });
    if (!existPost) {
      throw new HttpException(`type为${createEnumDto.type}的类型不存在`, 301);
    }
    await this.EnumService.save(createEnumDto);
    return '保存成功';
  }
  async deleteTEnum(id: string) {
    const existPost = await this.EnumService.findOne({
      where: { id },
    });
    if (!existPost) {
      throw new HttpException(`id为${id}的类型不存在`, -1);
    }
    await this.EnumService.delete(id);
    return '删除成功';
  }

  async updateEnum(createEnumDto: Partial<CreateEnumDto>) {
    const existPost = await this.EnumService.findOne({
      where: { id: createEnumDto.id },
    });
    if (!existPost) {
      throw new HttpException(`需要更新的数据不存在`, -1);
    }
    await this.EnumService.update(createEnumDto.id, createEnumDto);
    return '更新成功';
  }
}
