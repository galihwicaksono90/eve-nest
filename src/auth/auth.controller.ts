import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SignUpEmailDto, SignUpEmailSuccessDto } from './dto/sign-up-email.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { AuthService } from './auth.service';
import { ZodResponse } from 'nestjs-zod';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowAnonymous()
  @Post('sign-up/email')
  @ZodResponse({ type: SignUpEmailSuccessDto, status: HttpStatus.CREATED })
  async signupEmail(@Body() body: SignUpEmailDto) {
    await this.authService.signUpEmail({
      ...body,
      name: body.firstName,
    });
    return {
      status: true,
    };
  }
}
