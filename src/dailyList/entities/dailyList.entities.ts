import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class dailyList {
  @ApiProperty({ description: '日报id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @ApiProperty({ description: '日报日期' })
  @Column({ default: null })
  timeString: string;

  @ApiProperty({ description: '日报图' })
  @Column({ default: null })
  thumb_url: string;

  @ApiProperty({ description: '日报内容' })
  @Column({ type: 'text' })
  daily: string;
}
