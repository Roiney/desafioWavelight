import { BadRequestException, Injectable } from '@nestjs/common';
import { type User } from '../user/entities/user.entity';
import { PrismaService } from 'src/app/db/prisma/prisma.service';

@Injectable()
export class ServerGifService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(take: number, skip: number, user: User): Promise<any> {
    try {
      const findUser = await this.findUser(user);
      if (!findUser?.id) {
        throw new BadRequestException('Unauthenticated user');
      }

      const count = await this.prismaService.convertedGif.count({
        where: {
          userId: findUser.id,
        },
      });

      const allGifs = await this.prismaService.convertedGif.findMany({
        where: {
          userId: findUser.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take,
        skip,
      });
      return { count, allGifs };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  private async findUser(user: User): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
  }
}
