import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../libs/users-lib/src/constants/constants';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from 'libs/users-lib/user.entity';
import { PostsModule } from './posts/posts.module';
import { MulterModule } from '@nestjs/platform-express';
import { Posts } from 'libs/posts';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Posts],
      synchronize: true,
      autoLoadEntities: true
      
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule,
    UsersModule,
    PostsModule
  ],
})
export class AppModule {}
