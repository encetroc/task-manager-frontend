import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly URL = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  get(uri: string) {
    return this.http.get(`${this.URL}/${uri}`)
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.URL}/${uri}`, payload)
  }
  
  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.URL}/${uri}`, payload)
  }

  delete(uri: string) {
    return this.http.delete(`${this.URL}/${uri}`)
  }
}