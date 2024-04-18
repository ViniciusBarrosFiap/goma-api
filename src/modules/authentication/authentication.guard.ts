import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from './authentication.service';
export interface RequestWithUser extends Request {
  user: UserPayload;
}
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.getTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Erro de autorização');
    }

    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('JWT inválido');
    }
    return true;
  }
  private getTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
