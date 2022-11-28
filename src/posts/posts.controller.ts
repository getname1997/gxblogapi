import { PostsService, PostsRo } from './posts.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePostDto, GetBlogListPostDto } from './dto/create-post.dot';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('文章')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 创建文章
   * @param post
   */
  @ApiOperation({ summary: '创建文章' })
  @Post('create')
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  /**
   * 获取所有文章
   */
  @ApiOperation({ summary: '获取文章' })
  @Get('findAll')
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @Get('getBlog')
  async findById(@Query('id') id) {
    console.log(id);
    return await this.postsService.findById(id);
  }

  /**
   *  根据条件查找文章
   * @param post
   *
   */
  @ApiOperation({ summary: '查询文章' })
  @UseGuards(AuthGuard('jwt'))
  @Post('getBlogList')
  async getBlogList(@Body() post: GetBlogListPostDto) {
    return await this.postsService.getBlogList(post);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @Put('update')
  async update(@Query('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  /**
   * 删除
   * @Query id
   */
  @ApiOperation({ summary: '删除' })
  @Delete('blog')
  async remove(@Query('id') id, @Body() post) {
    console.log(post.id);
    return await this.postsService.remove(post.id);
  }
}
