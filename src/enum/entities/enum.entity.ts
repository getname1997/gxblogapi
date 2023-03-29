import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Enum')
export class EnumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  value: string;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 50 })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
