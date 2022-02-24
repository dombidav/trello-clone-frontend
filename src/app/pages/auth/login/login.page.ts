import {Component, OnDestroy, OnInit} from '@angular/core'
import {AuthService} from '../../../services/auth.service'
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  email = ''
  password = ''
  private sub?: Subscription

  constructor(private readonly auth: AuthService) { }

  ngOnInit() {
    return
  }

  login() {
    this.sub = this.auth.login(this.email, this.password)
    console.log('HIT')
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
