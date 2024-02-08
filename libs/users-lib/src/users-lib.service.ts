import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserFindCheckError } from './errors';

@Injectable()
export class UsersLibService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  getAllUsers() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(UserFindCheckError);
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(UserFindCheckError);
    }

    return this.repo.remove(user);
  }

  async changePassword(id: number, newPassword: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(UserFindCheckError);
    }

    user.password = newPassword;

    return await this.repo.save(user);
  }
}
