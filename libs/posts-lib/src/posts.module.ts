import { Module } from '@nestjs/common';
import { PostsLibService } from './posts.service';

@Module({
  providers: [PostsLibService],
  exports: [PostsLibService],
})
export class PostsModule {}
