import { IPost } from '../schemas/models/post.interface';

export abstract class PostRepository {
  abstract getMainPosts(): Promise<IPost[]>;
  abstract getPostsCount(): Promise<number>;
  abstract getAllPosts(limit: number, page: number): Promise<IPost[]>;
  abstract searchPosts(
    search: string,
    limit: number,
    page: number,
  ): Promise<IPost[]>;
  abstract getPost(postId: string): Promise<IPost>;
  abstract createPost(post: IPost): Promise<void>;
  abstract updatePost(postId: string, post: IPost): Promise<void>;
  abstract deletePost(postId: string): Promise<void>;
}
