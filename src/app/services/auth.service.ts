import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  async login(email: string, password: string) {
    const res = await this.http.post<object>(`${environment.api}/auth/login`, { email, password }).toPromise()
    this.saveToInstance(res)
    this.saveToStorage()
  }

  private saveToInstance(res: object) {
    res.access_token
  }

  private saveToStorage() {

  }

}
