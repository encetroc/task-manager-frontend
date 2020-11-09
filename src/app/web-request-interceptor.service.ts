import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { empty, Observable, Subject, throwError } from 'rxjs'
import { AuthService } from './auth.service'
import { catchError, switchMap } from 'rxjs/operators'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptorService implements HttpInterceptor {
  refreshingAccessToken: boolean
  accessTokenRefreshed: Subject<any> = new Subject()

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request)
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.refreshAccessToken()
          .pipe(
            switchMap(() => {
              request = this.addAuthHeader(request)
              return next.handle(request)
            }),
            catchError(err => {
              console.log(err)
              this.authService.logout()
              return empty()
            })
          )
        }
        return throwError(error)
      })
    )
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          observer.next()
          observer.complete()
        })
      })
    } else {
      this.refreshingAccessToken = true
      return this.authService.getNewAccessToken().pipe(
        tap(res => {
          this.refreshingAccessToken = false
          this.accessTokenRefreshed.next()
          console.log('refreshed', res)
        })
      )
    }
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
