import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TurdApiService } from './turds-api.service';

@Injectable()
export class TurdApInterceptor implements HttpInterceptor {
  constructor(public turdApi: TurdApiService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${environment.authToken}`
      }
    });
    return next.handle(request);
  }
}
