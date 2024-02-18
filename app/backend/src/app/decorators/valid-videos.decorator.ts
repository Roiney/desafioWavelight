import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

export const ValidVideoFiles = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const files: Express.Multer.File[] = request.files;

    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    for (const file of files) {
      // Verificar se o tipo MIME do arquivo corresponde a um arquivo de vídeo mp4
      if (file.mimetype !== 'video/mp4') {
        throw new BadRequestException(
          'Invalid video format. Only mp4 files are allowed.',
        );
      }
    }

    return files;
  },
);
