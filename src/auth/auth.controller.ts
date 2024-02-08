import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthLibService } from 'libs/auth-lib';
import { CreateUserDto } from 'libs/auth-lib/dto';

@Controller('api/auth')
export class AuthController {
  constructor(public authService: AuthLibService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async registerUser(@Body() body: CreateUserDto) {
    return this.authService.registerUser(body);
  }
}
