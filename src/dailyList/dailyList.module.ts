import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dailyList } from './entities/dailyList.entities';
import { dailyListController } from './dailyList.controller';
import { DailyListService } from './dailyList.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [TypeOrmModule.forFeature([dailyList]), HttpModule],
  controllers: [dailyListController],
  providers: [DailyListService],
})
export class dailyListModel {}
