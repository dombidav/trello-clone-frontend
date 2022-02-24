import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(environment.api + '/auth/login', { email, password }).subscribe(res => {
      console.log(res)
    })
  }
}
