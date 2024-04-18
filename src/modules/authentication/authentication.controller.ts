import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  login(@Body() { email, password }: AuthDTO) {
    return this.authenticationService.login(email, password);
  }
}
