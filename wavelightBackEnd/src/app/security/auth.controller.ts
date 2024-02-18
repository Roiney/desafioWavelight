import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { Public } from './decorators/is-public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Route to Login.',
    description: 'Route to log in by entering the user email and password.',
    tags: ['Auth'],
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Req() request: AuthRequest): Promise<any> {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new BadRequestException('Unauthenticated user');
    }
    return await this.authService.login(authenticatedUser);
  }
}
