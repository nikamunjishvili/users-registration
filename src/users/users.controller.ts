import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
} from '@nestjs/common';
import { UsersLibService } from 'libs/users-lib';
import {
  ChangePasswordDto,
  UpdateUserDto,
} from 'libs/users-lib/dto';
import { UserFindCheckError } from 'libs/users-lib/errors';

@Controller('/api/users')
export class UsersController {
  constructor(public usersService: UsersLibService) {}

  @Get('/')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  findUsers(@Param() id: string) {
    const user = this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException(UserFindCheckError);
    }
    return user;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Put('/change-password/:id')
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
