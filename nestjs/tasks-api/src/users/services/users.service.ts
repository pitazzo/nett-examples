import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserSignUpDto } from 'src/users/dtos/user-sigup.dto';
import { UserSignInDto } from 'src/users/dtos/user-signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: UserSignUpDto) {
    const user = this.userRepository.create({
      email: dto.email,
      hashPassword: await bcrypt.hash(dto.password, 12),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.userRepository.save(user);
  }

  async signIn(dto: UserSignInDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const matches = await bcrypt.compare(dto.password, user.hashPassword);

    if (!matches) {
      throw new UnauthorizedException();
    }

    return {
      token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
        role: 'admin',
      }),
    };
  }
}
