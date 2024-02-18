import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { type User } from '../modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { type UserToken } from './models/UserToken';
import { type UserPayload } from './models/UserPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(user: User): Promise<UserToken | any> {
    const findUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    if (!findUser) {
      throw new Error('Not validated user');
    }

    if (user.id) {
      const payload: UserPayload = {
        sub: user.id.toString(),
        email: user.email,
        name: user.name,
      };

      return await this.jwtService
        .signAsync(payload) // Retornando a Promise diretamente
        .then((accessToken) => {
          return {
            accessToken,
            user: findUser,
          };
        });
    }
  }

  async validateUserMail(email: string, password: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error('Not validated user');
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Email e/ou senha incorretos.');
      }

      return { ...user, password: undefined };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
