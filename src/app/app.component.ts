import {Component, OnInit} from '@angular/core'
import {StorageService} from './services/storage.service'
import {AuthService} from './services/auth.service'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Login', url: '/auth/login', icon: 'log-in' },
    { title: 'Register', url: '/auth/register', icon: 'log-in' },
  ]
  constructor(private readonly storage: StorageService, public readonly auth: AuthService) {}

  ngOnInit() {
    this.init().then()
  }

  private async init() {
    await this.storage.init()
    await this.auth.init()
  }
}
