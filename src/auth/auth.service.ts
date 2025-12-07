import { User } from '@/api/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService as BetterAuthService } from '@thallesp/nestjs-better-auth';
import { CreateUserSchema } from './dto/signup.dto';
import { Auth } from './better-auth.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private auth: BetterAuthService<Auth>,
  ) {}

  async create(body: CreateUserSchema) {
    const result = await this.auth.api.signUpEmail({
      body,
    });
    return result;
  }
}
