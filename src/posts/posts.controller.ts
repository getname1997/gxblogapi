import { PostsService, PostsRo } from './posts.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 创建文章
   * @param post
   */
  @ApiOperation({ summary: '创建文章' })
  @Post('create')
  async create(@Body() post) {
    console.log(1145454541);
    return await this.postsService.create(post);
  }

  /**
   * 获取所有文章
   */
  @ApiOperation({ summary: '获取文章' })
  @Get('findAll')
  async findAll(@Query() query): Promise<PostsRo> {
    console.log(query);
    return await this.postsService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @Get(':id')
  async findById(@Param('id') id) {
    console.log(id);
    return await this.postsService.findById(id);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  /**
   * 删除
   * @param id
   */
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }
}
