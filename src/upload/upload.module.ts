import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadEntity } from './entities/upload.entity';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: './fileUpload',
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
      }),
    }),
    TypeOrmModule.forFeature([UploadEntity]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class uploadModule {}
