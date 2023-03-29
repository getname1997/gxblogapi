import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEnumDto } from './dto/update-enum.dto';
import { CreateEnumTypeDto } from './dto/createType-enum.dto';
import { Repository } from 'typeorm';
import { EnumTypeEntity } from './entities/enumType.entity';
import { EnumEntity } from './entities/enum.entity';
@Injectable()
export class EnumService {
  constructor(
    @InjectRepository(EnumTypeEntity)
    private readonly EnumTypeService: Repository<CreateEnumTypeDto>,

    @InjectRepository(EnumEntity)
    private readonly EnumService: Repository<EnumEntity>,
  ) {}
  create(createEnumDto: Partial<EnumEntity>) {
    console.log(createEnumDto);
    return 'This action adds a new enum';
  }
  createType(post: Partial<CreateEnumTypeDto>) {
    return this.EnumTypeService.save(post);
  }

  async updateEnumType(post: Partial<CreateEnumTypeDto>) {
    const { id } = post;
    const existPost = await this.EnumTypeService.findOne({
      where: { id },
    });
    if (!existPost) {
      throw new HttpException(`id为${id}的类型不存在`, 200);
    }
    await this.EnumTypeService.update(id, post);
    return '更新成功';
  }
  async deleteType(id: string) {
    const existPost = await this.EnumTypeService.findOne({
      where: { id },
    });
    if (!existPost) {
      throw new HttpException(`id为${id}的类型不存在`, 200);
    }
    await this.EnumTypeService.remove(existPost);
    return '删除成功';
  }
  findAll() {
    return `This action returns all enum`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enum`;
  }

  update(id: number, updateEnumDto: UpdateEnumDto) {
    return `This action updates a #${id} enum`;
  }

  remove(id: number) {
    return `This action removes a #${id} enum`;
  }
}
