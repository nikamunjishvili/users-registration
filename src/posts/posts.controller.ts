import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { PostsLibService } from 'libs/posts';
import { CreatePostDto } from 'libs/posts/dto';
import {
  AddPostImageError,
  InvalidPostId,
  PostNotFoundError,
} from 'libs/posts/errors';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsLibService: PostsLibService) {}

  @Get('/')
  getAllPosts() {
    return this.postsLibService.getAllPosts();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/add-post')
  createPosts(@Body() body: CreatePostDto) {
    if (!body) {
      throw new BadRequestException(AddPostImageError);
    }

    try {
      return this.postsLibService.createPost(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/:postId')
  getPostWithId(@Param('postId') postId: string) {
    const id = parseInt(postId, 10);
    if (isNaN(id)) {
      throw new BadRequestException(InvalidPostId);
    }

    const post = this.postsLibService.getPostWithId(id);
    if (!post) {
      throw new BadRequestException(PostNotFoundError);
    }

    return post;
  }
}
