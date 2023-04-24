import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateEnumDto {
  @ApiProperty({ description: 'id' })
  readonly id: string;
  @ApiProperty({ description: '枚举' })
  readonly name: string;

  @ApiProperty({ description: 'key对应的枚举' })
  readonly value: string;

  @ApiPropertyOptional({ description: '枚举类型' })
  readonly type: string;

  @ApiPropertyOptional({ description: '类型id' })
  readonly type_id: string;

  @ApiPropertyOptional({ description: '备注' })
  readonly description: string;
}
