import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dailyList } from './entities/dailyList.entities';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class DailyListService {
  constructor(
    @InjectRepository(dailyList)
    private UserDailyList: Repository<dailyList>,

    private httpService: HttpService,
  ) {}
  @Cron('15 * * * * *')
  getHello(): string {
    return 'Hello World!';
  }

  @Cron('0 15 8 * * *')
  async getDaily() {
    const timeString = dayjs().format('YYYY-MM-DD');
    const Daily = await this.UserDailyList.findOne({
      where: { timeString },
    });
    if (!Daily) {
      const { data } = await this.httpService.axiosRef.get(
        'http://bjb.yunwj.top/php/60miao/qq.php',
      );
      const params = {
        daily: JSON.stringify(data.wb),
        timeString,
        thumb_url: data.tp,
      };
      await this.UserDailyList.save(params);
      return params;
    }
    return Daily;
  }
}
