import { BadRequestException, Injectable } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import * as fs from 'fs';
import { PrismaService } from 'src/app/db/prisma/prisma.service';
import { type User } from '../user/entities/user.entity';

@Injectable()
export class ConverterService {
  constructor(private readonly prismaService: PrismaService) {}
  async converter(file: Express.Multer.File, user: User): Promise<string> {
    const tmpFilePath = await this.saveTmpFile(file);

    const gifFilePath = await this.convertVideoToGif(tmpFilePath, user);

    await this.saveConvertedGifToDatabase(gifFilePath, user);

    return 'Conversão concluída e GIF salvo na pasta do usuário.';
  }

  private async saveTmpFile(file: Express.Multer.File): Promise<string> {
    const tmpDir = path.join(__dirname, '..', '..', '..', 'gifs', 'tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    const uniqueFileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;
    const tmpFilePath = path.join(tmpDir, `${uniqueFileName}.mp4`);
    fs.writeFileSync(tmpFilePath, file.buffer);
    return tmpFilePath;
  }

  private async convertVideoToGif(
    tmpFilePath: string,
    user: User,
  ): Promise<string> {
    const gifsDir = path.join(__dirname, '..', '..', '..', 'gifs', user.email);
    console.log(gifsDir);

    if (!fs.existsSync(gifsDir)) {
      fs.mkdirSync(gifsDir, { recursive: true });
    }
    const uniqueFileName = path.basename(
      tmpFilePath,
      path.extname(tmpFilePath),
    );
    const gifFilePath = path.join(gifsDir, `${uniqueFileName}.gif`);

    return await new Promise<string>((resolve, reject) => {
      ffmpeg(tmpFilePath)
        .output(gifFilePath)
        .outputOptions(['-vf', 'fps=10,scale=320:-1:flags=lanczos'])
        .on('end', () => {
          fs.unlinkSync(tmpFilePath);
          resolve(gifFilePath);
        })
        .on('error', (err) => {
          reject(err);
        })
        .run();
    });
  }

  private async saveConvertedGifToDatabase(
    gifFilePath: string,
    user: User,
  ): Promise<void> {
    const gifsBaseDir = path.join(__dirname, '..', '..', '..', 'gifs');
    const relativePath = path.relative(gifsBaseDir, gifFilePath);
    const findUser = await this.findUser(user);
    if (!findUser?.id) {
      throw new BadRequestException('Unauthenticated user');
    }
    await this.prismaService.convertedGif.create({
      data: {
        userId: findUser.id,
        filePath: relativePath,
      },
    });
  }

  private async findUser(user: User): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
  }
}
