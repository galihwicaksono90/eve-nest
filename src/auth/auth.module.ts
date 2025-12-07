import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@/api/user/user.entity';
import { getConfig } from './better-auth.config';
import { EmailService } from '@/shared/email/email.service';
import { EmailModule } from '@/shared/email/email.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    BetterAuthModule.forRootAsync({
      imports: [EmailModule],
      inject: [EmailService],
      useFactory: (emailService: EmailService) => {
        return {
          auth: getConfig({ emailService }),
        };
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
