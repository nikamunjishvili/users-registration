import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserInterface,
  RegisterUserSuccessResponseInterface,
} from 'libs/auth-lib/interfaces';
import { User } from 'libs/users-lib/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserEmailCheckError } from './errors';

@Injectable()
export class AuthLibService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

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
}
