import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {ILoginResponse} from '../../interfaces/login-response.interface'
import {IUser} from '../../interfaces/user.interface'
import {IToken} from '../../interfaces/token.interface'
import {StorageService} from './storage.service'
import {TOKEN_KEY, USER_OBJECT_KEY} from '../../constants/storage-keys.const'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user?: IUser
  private _token?: IToken

  get user(): IUser {
    return this._user
  }

  get token(): IToken {
    return this._token
  }

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService
  ) { }

  async init() {
    const token = await this.storage.get<IToken>(TOKEN_KEY)
    if(!token){
      return
    }


    const user = await this.storage.get<IUser>(USER_OBJECT_KEY)

    if(token.exp < Date.now() || !user){
      await this.storage.remove(TOKEN_KEY)
      return
    }

    this._token = token
    this._user = user
  }

  async login(email: string, password: string) {
    const res = await this.http.post<ILoginResponse>(`${environment.api}/auth/login`, { email, password }).toPromise()
    this.saveToInstance(res)
    await this.saveToStorage()
  }

  private saveToInstance(res: ILoginResponse) {
    this._token = { token: res.access_token, exp: res.expires_in * 1_000 + Date.now()}
    this._user = res.user
  }

  private saveToStorage() {
    return Promise.all([ // Wait for all tasks. Good for parallel processing, bad for the eyes
      this.storage.set(TOKEN_KEY, this._token).then(),
      this.storage.set(USER_OBJECT_KEY, this._user).then()
    ])
  }

}
