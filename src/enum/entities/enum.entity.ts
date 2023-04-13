import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Enum')
export class EnumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  value: string;

  @Column({ length: 100 })
  type: string;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
