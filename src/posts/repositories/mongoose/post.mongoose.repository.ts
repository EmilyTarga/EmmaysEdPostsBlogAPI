import { IPost } from 'src/posts/schemas/models/post.interface';
import { PostRepository } from '../post.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../../schemas/post.schema';
import { Model } from 'mongoose';

export class PostMongooseRepository implements PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  getMainPosts(): Promise<IPost[]> {
    return this.postModel.find().skip(0).limit(10).exec();
  }

  getPostsCount(): Promise<number> {
    return this.postModel.countDocuments().exec();
  }

  getAllPosts(limit: number, page: number): Promise<IPost[]> {
    const offset = (page - 1) * limit;

    return this.postModel.find().skip(offset).limit(limit).exec();
  }

  searchPosts(search: string, limit: number, page: number): Promise<IPost[]> {
    const offset = (page - 1) * limit;

    const re = new RegExp(search, 'i');

    return this.postModel
      .find({ $or: [{ title: { $regex: re } }, { content: { $regex: re } }] })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  getPost(postId: string): Promise<IPost> {
    return this.postModel.findById(postId).exec();
  }

  async createPost(post: IPost): Promise<void> {
    const createPost = new this.postModel(post);

    await createPost.save();
  }

  async updatePost(postId: string, post: IPost): Promise<void> {
    await this.postModel
      .updateOne(
        { _id: postId },
        {
          title: post.title,
          content: post.content,
          subject: post.subject,
          author: post.author,
        },
      )
      .exec();
  }

  async deletePost(postId: string): Promise<void> {
    await this.postModel.deleteOne({ _id: postId }).exec();
  }
}
