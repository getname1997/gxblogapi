import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Header,
  Query,
  HttpCode,
  HttpStatus,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';
import multer = require('multer');
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PostsService } from '../posts/posts.service';
@Controller('upload')
@ApiBearerAuth()
export class UploadController {
  constructor(
    private readonly UploadService: UploadService,
    private readonly postsService: PostsService,
  ) {}
  @Post('up')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'text/plain;charset=UTF-8')
  @ApiOperation({ summary: '上传' })
  @UseInterceptors(
    FilesInterceptor('file', 1, {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './fileUpload/');
        },
        filename: (req, file, cd) => {
          cd(null, decodeURI(file.originalname));
          return;
        },
      }),
    }),
  )
  async uploadFile(@UploadedFiles() file: Express.Multer.File, @Body() body) {
    return this.UploadService.uploadFile(file, body, this.postsService);
  }

  @Get()
  getFile(@Res({ passthrough: true }) res: Response, @Query() query) {
    return this.UploadService.getFileData(query.path);
  }
}
