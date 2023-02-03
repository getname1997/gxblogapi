import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Header,
  StreamableFile,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';
import { createWriteStream, createReadStream } from 'fs';
import { join } from 'path';
@Controller('upload')
export class UploadController {
  constructor(private readonly UploadService: UploadService) {}
  @Post('up')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(@UploadedFiles() file: Express.Multer.File, @Body() body) {
    return this.UploadService.uploadFile(file, body);
  }

  @Get()
  getFile(
    @Res({ passthrough: true }) res: Response,
    @Query() query,
  ): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'fileUpload', '2.js'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment;',
    });
    return new StreamableFile(file);
  }
}
