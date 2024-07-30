import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { z } from 'zod';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  subject: z.string(),
  author: z.string(),
});

type Post = z.infer<typeof postSchema>;

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getMainPosts() {
    return this.postService.getMainPosts();
  }

  @Get('/admin')
  async getAllPosts(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postService.getAllPosts(limit, page);
  }

  @Get('/search')
  async searchPosts(
    @Query('search') search: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postService.searchPosts(search, limit, page);
  }

  @Get(':postId')
  async getPost(@Param('postId') postId: string) {
    return this.postService.getPost(postId);
  }

  @UsePipes(new ZodValidationPipe(postSchema))
  @Post()
  async createPost(@Body() { title, content, subject, author }: Post) {
    return this.postService.createPost({ title, content, subject, author });
  }

  @Put(':postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body() { title, content, subject, author }: Post,
  ) {
    return this.postService.updatePost(postId, {
      title,
      content,
      subject,
      author,
    });
  }

  @Delete(':postId')
  async deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }
}
