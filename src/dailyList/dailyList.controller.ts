import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DailyListService } from './dailyList.service';

@Controller('dailyList')
export class dailyListController {
  constructor(private readonly dailyListService: DailyListService) {}
  /**
   * 查询本日的日报
   */
  @ApiOperation({ summary: '查询本日的日报' })
  @Get('')
  async create() {
    // Daily
    return this.dailyListService.getDaily();
  }
}
