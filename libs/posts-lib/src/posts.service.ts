import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostInterface } from './interfaces';
import { MissingAllInputsError } from './errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './post.entity';

@Injectable()
export class PostsLibService {
    @InjectRepository(Posts) private repo: Repository<Posts>
  private readonly PostData = [];

  getAllPosts() {
    return this.PostData;
  }

  getPostWithId(id: number) {
    return this.PostData.find((post) => post.id === id);
  }

  createPost(data: CreatePostInterface) {
    if (!data.title || !data.body) {
      throw new BadRequestException(MissingAllInputsError);
    }

    const newPost: CreatePostInterface = {
      id: this.PostData.length + 1,
      title: data.title,
      body: data.body,
    };

    this.PostData.push(newPost);

    return newPost;
  }
}
