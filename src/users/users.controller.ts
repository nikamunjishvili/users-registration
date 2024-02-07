import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersLibService } from 'libs/users-lib';
import {
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
} from 'libs/users-lib/dto';

@Controller('/api/users')
export class UsersController {
  constructor(public usersService: UsersLibService) {}

  @Get('/')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async registerUser(@Body() body: CreateUserDto) {
    return this.usersService.registerUser(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users/:id')
  findUsers(@Param() id: string) {
    const user = this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Put('users/change-password/:id')
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    console.log(`Changing password for user ${id}`);
    return this.usersService.changePassword(
      parseInt(id),
      changePasswordDto.newPassword,
    );
  }
}
