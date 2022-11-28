import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: '文章标题' })
  readonly title: string;

  @ApiProperty({ description: '作者' })
  readonly author: string;

  @ApiProperty({ description: '内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '封面' })
  readonly cover_url: string;

  @ApiProperty({ description: '类型' })
  readonly type: number;
}

export class GetBlogListPostDto {
  @ApiProperty({ description: '标题' })
  readonly title: string;
  @ApiProperty({ description: '作者' })
  readonly author: string;
}
