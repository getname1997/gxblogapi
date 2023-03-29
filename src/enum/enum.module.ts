import { Module } from '@nestjs/common';
import { EnumService } from './enum.service';
import { EnumController } from './enum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnumEntity } from './entities/enum.entity';
import { EnumTypeEntity } from './entities/enumType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnumEntity, EnumTypeEntity])],
  controllers: [EnumController],
  providers: [EnumService],
})
export class EnumModule {}
