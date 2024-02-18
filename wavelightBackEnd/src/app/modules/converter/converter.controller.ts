import {
  BadRequestException,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ValidVideoFiles } from 'src/app/decorators/valid-videos.decorator';
import { ConverterService } from './converter.service';
import { JwtAuthGuard } from 'src/app/security/guards/jwt-auth.guard';
import { AuthRequest } from 'src/app/security/models/AuthRequest';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}
  @ApiOperation({
    summary: 'Upload and convert an MP4 video file to a GIF.',
    description:
      'Route used to upload an MP4 video file and convert it to a GIF. The converted GIF will be associated with the authenticated user who uploaded the file.',
    tags: ['GIF'],
  })
  @Post('mp4')
  @UseInterceptors(FilesInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async uploadFilesVehicle(
    @ValidVideoFiles() file: Express.Multer.File[],
    @Req() request: AuthRequest,
  ): Promise<any> {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new BadRequestException('Unauthenticated user');
    }

    if (!file || file.length === 0) {
      throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
    }

    if (file.length > 1) {
      throw new HttpException(
        'The system only accepts 1 video.',
        HttpStatus.BAD_REQUEST,
      );
    }
    /* eslint-disable no-unreachable-loop */
    for (const unique of file) {
      return await this.converterService.converter(unique, authenticatedUser);
    }
    /* eslint-enable no-unreachable-loop */
  }
}
