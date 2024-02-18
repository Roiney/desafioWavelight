import { type Request } from 'express';
import { type User } from 'src/app/modules/user/entities/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
