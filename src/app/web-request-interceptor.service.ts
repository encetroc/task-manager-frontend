import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request)
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('interceptor error', error)
        return throwError(error)
      })
    )
  }

  private addAuthHeader(request: HttpRequest<any>) {
    const accessToken = this.authService.getAccessToken()
    if (accessToken) {
      return request.clone(
        {
          setHeaders: {'x-access-token': accessToken}
        }
      )
    }
    return request
  }
}
