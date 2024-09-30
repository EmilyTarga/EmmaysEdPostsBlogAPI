import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { IPost } from '../schemas/models/post.interface';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getMainPosts(): Promise<IPost[]> {
    return this.postRepository.getMainPosts();
  }

  async getPostsCount(): Promise<number> {
    return this.postRepository.getPostsCount();
  }

  async getAllPosts(limit: number, page: number): Promise<IPost[]> {
    return this.postRepository.getAllPosts(limit, page);
  }

  async searchPosts(
    search: string,
    limit: number,
    page: number,
  ): Promise<IPost[]> {
    return this.postRepository.searchPosts(search, limit, page);
  }

  async getPost(postId: string): Promise<IPost> {
    const post = await this.postRepository.getPost(postId);
    if (!post) throw new NotFoundException('Post Not Found');
    return post;
  }

  async createPost(post: IPost): Promise<void> {
    return this.postRepository.createPost(post);
  }

  async updatePost(postId: string, post: IPost): Promise<void> {
    return this.postRepository.updatePost(postId, post);
  }

  async deletePost(postId: string): Promise<void> {
    return this.postRepository.deletePost(postId);
  }
}
