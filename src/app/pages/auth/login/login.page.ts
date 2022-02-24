import {Component} from '@angular/core'
import {AuthService} from '../../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = ''
  password = ''

  constructor(private readonly auth: AuthService) { }

  async login() {
    await this.auth.login(this.email, this.password)
    console.log('Navigate')
  }
}
