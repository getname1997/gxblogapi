import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadEntity } from './entities/upload.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private readonly postsRepository: Repository<UploadEntity>,
  ) {}
  async uploadFile(file, body): Promise<any> {
    console.log(file, body.remarks, '看看数据');
    const param = {
      path: file[0].originalname,
      file_name: file[0].originalname,
      remarks: body.remarks,
      create_time: new Date(),
      update_time: new Date(),
    };
    const data = await this.postsRepository.save(param);
    return data;
  }
}
