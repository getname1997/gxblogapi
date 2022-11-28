import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    await this.postsRepository.save(post);
    return '保存成功';
  }

  // 获取文章列表
  async findAll(query): Promise<PostsRo> {
    const allViewedPhotos = await this.postsRepository.find({});

    const count = allViewedPhotos.length;
    return { list: allViewedPhotos, count: count };
  }

  async getBlogList(data): Promise<PostsRo> {
    const allViewedPhotos = await this.postsRepository
      .createQueryBuilder('posts')
      .where('posts.title LIKE :title')
      .setParameters({ title: `%${data.title}%` })
      .andWhere('posts.author LIKE :author')
      .setParameters({ author: `%${data.author}%` })
      .getMany();

    const count = allViewedPhotos.length;
    return { list: allViewedPhotos, count: count };
  }

  // 获取指定文章
  async findById(id): Promise<PostsEntity> {
    return await this.postsRepository.findOne({
      where: { id },
    });
  }

  // 更新文章
  async updateById(id, post): Promise<string> {
    const blogId = Number(post.id);

    const existPost = await this.postsRepository.findOne({
      where: { id: blogId },
    });
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 200);
    }
    console.log(blogId, 111);
    post.create_time = existPost.create_time;
    post.update_time = new Date();
    await this.postsRepository.update(post.id, post);
    return '更新完成';
  }

  // 刪除文章
  async remove(id) {
    console.log(id, 'id');
    const existPost = await this.postsRepository.findOneById(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 200);
    }
    await this.postsRepository.remove(existPost);
    return '删除成功';
  }
}
