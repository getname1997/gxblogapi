import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadEntity } from './entities/upload.entity';
import { Repository } from 'typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private readonly UploadEntity: Repository<UploadEntity>,
  ) {}
  async uploadFile(file, body, postsService): Promise<any> {
    const param = {
      path: file[0].filename,
      file_name: file[0].filename,
      remarks: body.remarks,
      create_time: new Date(),
      update_time: new Date(),
    };
    await this.UploadEntity.save(param);
    const params = {
      title: body.title,
      type: body.type,
      content: file[0].filename,
      author: body.author,
    };
    return postsService.create(params);
  }

  async getFileData(path) {
    const result = await readFileSync(join(process.cwd(), 'fileUpload', path));
    return result.toString();
  }
}
