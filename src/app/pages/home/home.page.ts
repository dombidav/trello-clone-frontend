import { Component, OnInit } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${environment.api}/user`).subscribe(res => console.log(res))
  }

}
