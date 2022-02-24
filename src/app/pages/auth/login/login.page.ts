import {Component} from '@angular/core'
import {AuthService} from '../../../services/auth.service'
import {NavController} from '@ionic/angular'
import {HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = ''
  password = ''

  constructor(private readonly auth: AuthService, private readonly router: NavController) { }

  async login() {
    try {
      await this.auth.login(this.email, this.password)
      this.router.navigateForward('/home').then()
    } catch (e) {
      if((e as HttpErrorResponse).status === 401) {
        console.error('Email or password mismatch')
      }
    }
  }
}
