import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
export interface UserPayload {
  sub: string;
  userName: string;
}
@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, passwordInput: string) {
    const user = await this.userService.searchWithEmail(email);

    const userWasAuthenticated = await bcrypt.compare(
      passwordInput,
      user.password,
    );

    if (!userWasAuthenticated) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }
    const payload: UserPayload = {
      sub: user.id,
      userName: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
