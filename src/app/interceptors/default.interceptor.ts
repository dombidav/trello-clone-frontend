import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Injectable} from '@angular/core'
import {StorageService} from '../services/storage.service'
import {IToken} from '../../interfaces/token.interface'
import {TOKEN_KEY} from '../../constants/storage-keys.const'
import {fromPromise} from 'rxjs/internal-compatibility'

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private readonly storage: StorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return fromPromise(this.handle(req, next))
  }

  private async handle(req: HttpRequest<any>, next: HttpHandler) {
    const tokenObject = await this.storage.get<IToken>(TOKEN_KEY)
    let cloned = req.clone()
    if(tokenObject) {
      cloned = req.clone({ headers: req.headers.set('Authorization', `Bearer ${tokenObject.token}`) })
    }

    return next.handle(cloned).toPromise()
  }
}
