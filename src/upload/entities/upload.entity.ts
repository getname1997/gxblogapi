// 声明表实体
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('upload')
export class UploadEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ default: '' })
  path: string;

  @Column({ default: '' })
  file_name: string;

  @Column({ default: '' })
  remarks: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
