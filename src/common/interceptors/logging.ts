import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    return call$.pipe(
      tap(() => console.log(`${request.method.toUpperCase()} ${request.url} - ${Date.now() - now}ms`)),
    );
  }
}