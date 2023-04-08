import { MessageService } from './../services/message.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storage:       StorageService, 
    public messageService: MessageService, 
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let localUser = this.storage.getLocalUser();
  
      if (localUser) {
        const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${localUser.token}`) });
        return next.handle(cloneReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 403) {
              this.messageService.setError('Você não tem permissão para acessar esta página');
            }
            return throwError(error);
          })
        );
      } else {
        return next.handle(request);
      }
    }
  }   

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
];
