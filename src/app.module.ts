import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../libs/users-lib/src/constants/constants';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from 'libs/users-lib/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true
      
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule,
    UsersModule
  ],
})
export class AppModule {}
