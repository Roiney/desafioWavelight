import { Module } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConverterController } from './converter.controller';
import { PrismaService } from 'src/app/db/prisma/prisma.service';

@Module({
  controllers: [ConverterController],
  providers: [ConverterService, PrismaService],
})
export class ConverterModule {}
