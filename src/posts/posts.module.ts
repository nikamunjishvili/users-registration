import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/users-lib/user.entity';
import { Posts, PostsLibService } from 'libs/posts';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostsController],
    providers: [PostsLibService],
})
export class PostsModule {}
