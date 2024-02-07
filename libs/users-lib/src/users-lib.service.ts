import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInterface } from './interfaces';
import { RegisterUserSuccessResponseInterface } from './interfaces/register-user-success-response.interface';
import { User } from './user.entity';
import { UserFindCheckError, RegisterUserEmailCheckError } from './errors';

@Injectable()
export class UsersLibService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  getAllUsers() {
    return this.repo.find();
  }

  async registerUser(
    cretentials: CreateUserInterface,
  ): Promise<RegisterUserSuccessResponseInterface> {
    const { firstName, lastName, phoneNumber, email, password } = cretentials;

    const existingUser = await this.repo.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException(RegisterUserEmailCheckError.message);
    }

    const user = this.repo.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });

    const savedUser = await this.repo.save(user);

    const payload = { sub: savedUser.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
