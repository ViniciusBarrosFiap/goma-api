import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequestWithUser } from '../../modules/authentication/authentication.guard';
@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request | RequestWithUser>();
    const response = httpContext.getResponse<Response>();
    const { path, method } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${path}`);
    const instancePreController = Date.now();
    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(
            `Rota acessada pelo usuário: ${request.user.username}`,
          );
        }
        const executationTime = Date.now() - instancePreController;
        this.logger.log(
          `Resposta: status: ${statusCode} - Tempo de execução: ${executationTime}ms`,
        );
      }),
    );
  }
}
