import {
  ZodValidationPipe,
  ZodSerializerInterceptor,
  ZodSerializationException,
} from 'nestjs-zod';
import {
  APP_PIPE,
  APP_INTERCEPTOR,
  APP_FILTER,
  BaseExceptionFilter,
} from '@nestjs/core';
import { ZodError } from 'zod';
import {
  Module,
  HttpException,
  ArgumentsHost,
  Logger,
  Catch,
} from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';

import { env } from '@/utils/config';
import { UserService } from '@/api/user/user.service';
import { EmailService } from '@/shared/email/email.service';
import { EmailModule } from '@/shared/email/email.module';

@Catch(HttpException)
class HttpExceptionFilter extends BaseExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception instanceof ZodSerializationException) {
      const zodError = exception.getZodError();

      if (zodError instanceof ZodError) {
        this.logger.error(`ZodSerializationException: ${zodError.message}`);
      }
    }

    super.catch(exception, host);
  }
}

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      define: {
        paranoid: true,
        timestamps: true,
      },
    }),

    AuthModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    EmailService,
  ],
})
export class AppModule {}
