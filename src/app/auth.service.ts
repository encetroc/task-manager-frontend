import { Injectable } from '@angular/core'
import { WebRequestService } from './web-request.service'
import { Router } from '@angular/router'
import { shareReplay, tap } from 'rxjs/operators'
import { HttpResponse } from '@angular/common/http'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webReqSer: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    return this.webReqSer.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'))
      })
    )
  }

  signup(email: string, password: string) {
    return this.webReqSer.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'))
      })
    )
  }

  logout() {
    this.removeSession()
    this.router.navigateByUrl('/login')
  }

  getAccessToken() {
    return localStorage.getItem('access-token')
  }

  getRefreshToken() {
    return localStorage.getItem('refresh-token')
  }

  getUserId() {
    return localStorage.getItem('user-id')
  }

  getRefreshOptions() {
    return {
      headers: {
        'x-refresh-token': this.getRefreshToken(), 
        '_id': this.getUserId()
      },
      observe: 'response'
    }
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('access-token', accessToken)
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId)
    localStorage.setItem('access-token', accessToken)
    localStorage.setItem('refresh-token', refreshToken)
  }

  private removeSession() {
    localStorage.removeItem('user-id')
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
  }

  getNewAccessToken() {
    return this.http.get(`${this.webReqSer.URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(), 
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap(res => {
        this.setAccessToken(res.headers.get('x-access-token'))
      })
    )
  }
}
