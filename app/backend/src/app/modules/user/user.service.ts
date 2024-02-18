import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/app/db/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { type User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const isEmailIsValid = await this.validateEmail(createUserDto.email);

      if (isEmailIsValid) {
        throw new BadRequestException('Email has already been registered');
      }

      const { name, email, password } = createUserDto;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const data = { name, email, password: passwordHash };

      const createUser = await this.prismaService.user.create({
        data,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          canceledAt: true,
        },
      });

      return createUser;
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }

  async validateEmail(email: string): Promise<boolean> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      return !!user;
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }
}
