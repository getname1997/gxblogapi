import { ApiProperty } from '@nestjs/swagger';
export class CreateEnumTypeDto {
  @ApiProperty({ description: 'id' })
  readonly id: string;

  @ApiProperty({ description: 'type名称' })
  readonly name: string;

  @ApiProperty({ description: '备注' })
  readonly description: string;

  @ApiProperty({ description: '创建时间' })
  readonly create_time: string;

  @ApiProperty({ description: '更新时间' })
  readonly update_time: string;
}
