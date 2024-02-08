import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/users-lib/user.entity';
import { AuthController } from './auth.controller';
import { AuthLibService } from 'libs/auth-lib';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthLibService],
})
export class AuthModule {}
