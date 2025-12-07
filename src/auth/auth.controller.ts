import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowAnonymous()
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    const response = await this.authService.create({
      ...body,
      name: body.firstName,
    });
    return response;
  }
}
