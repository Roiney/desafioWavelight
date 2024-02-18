import { Module } from '@nestjs/common';
import { ServerGifService } from './server-gif.service';
import { ServerGifController } from './server-gif.controller';
import { PrismaService } from 'src/app/db/prisma/prisma.service';

@Module({
  controllers: [ServerGifController],
  providers: [ServerGifService, PrismaService],
})
export class ServerGifModule {}
