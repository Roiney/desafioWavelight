import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { JwtAuthGuard } from 'src/app/security/guards/jwt-auth.guard';
import { ServerGifService } from './server-gif.service';
import { AuthRequest } from 'src/app/security/models/AuthRequest';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Server Gif')
@Controller('server-gif')
export class ServerGifController {
  constructor(private readonly serverGifService: ServerGifService) {}

  @ApiOperation({
    summary: 'Route to serve a GIF file.',
    description:
      'Route used to serve a GIF file by providing the filename as a parameter in the URL.',
    tags: ['GIF'],
  })
  @Get(':filename')
  async serveGif(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<any> {
    const gifsDir = path.join(__dirname, '..', '..', '..', 'gifs');
    const filePath = path.join(gifsDir, filename);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      return res.status(404).send('Arquivo não encontrado');
    }
  }

  @ApiOperation({
    summary: 'Get all GIF paths for the current user.',
    description:
      'Route used to get all GIF paths associated with the current authenticated user.',
    tags: ['GIF'],
  })
  @Get()
  @ApiQuery({
    name: 'skip',
    type: String,
    required: true,
    description: 'Start listing Gifs from the first registered (e.g., 0)',
    example: '0',
  })
  @ApiQuery({
    name: 'take',
    type: String,
    required: true,
    description: 'How many Gifs will be listed per page (e.g., 10)',
    example: '10',
  })
  async findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Req() request: AuthRequest,
  ): Promise<any> {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new BadRequestException('Unauthenticated user');
    }
    return await this.serverGifService.findAll(+take, +skip, authenticatedUser);
  }
}
