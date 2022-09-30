import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PostsEntity } from './entities/posts.entity';

export interface PostsRo {
  list: PostsEntity[];
  count: number;
}
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  // 创建文章
  async create(post: Partial<PostsEntity>): Promise<string> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 200);
    }
    const doc = await this.postsRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 200);
    }
    const data = await this.postsRepository.save(post);
    console.log(data);
    return '保存成功';
  }

  // 获取文章列表
  async findAll(query): Promise<PostsRo> {
    const allViewedPhotos = await this.postsRepository.find({
      where: { id: 4 },
    });
    console.log(allViewedPhotos, 444);
    // qb.where('1 = 1');
    // qb.orderBy('post.create_time', 'DESC');

    const count = allViewedPhotos.length;
    // console.log(count);
    // const { pageNum = 1, pageSize = 10 } = query;
    // qb.limit(pageSize);
    // qb.offset(pageSize * (pageNum - 1));

    // const posts = await qb.getMany();
    return { list: allViewedPhotos, count: count };
  }

  // 获取指定文章
  async findById(id): Promise<PostsEntity> {
    return await this.postsRepository.findOneById(id);
  }

  // 更新文章
  async updateById(id, post): Promise<PostsEntity> {
    const existPost = await this.postsRepository.findOneById(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 200);
    }
    const updatePost = this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }

  // 刪除文章
  async remove(id) {
    console.log(11);
    const existPost = await this.postsRepository.findOneById(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 200);
    }
    await this.postsRepository.remove(existPost);
    return '删除成功';
  }
}
