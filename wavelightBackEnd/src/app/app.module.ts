import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './security/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConverterModule } from './modules/converter/converter.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ServerGifModule } from './modules/server-gif/server-gif.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'gifs'),
    }),
    ConfigModule.forRoot(),
    PrismaModule.forRoot({ isGlobal: true }),
    HealthModule,
    UserModule,
    AuthModule,
    JwtModule,
    ConverterModule,
    ServerGifModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
