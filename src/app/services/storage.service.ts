import {Injectable} from '@angular/core'

import {Storage} from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null
  private _ready = false

  constructor(private readonly storage: Storage) {
    this.init().then()
  }

  get ready(): boolean {
    return this._ready
  }

  async init() {
    this._storage = await this.storage.create()
    this._ready = true
  }

  async set(key: string, value: any) {
    await this.waitForStorage()
    await this._storage?.set(key, value)
  }

  async get<T = any>(key: string): Promise<T | null> {
    await this.waitForStorage()
    return (await this._storage?.get(key)) ?? null
  }

  async remove<T = any>(key: string): Promise<T | null> {
    await this.waitForStorage()
    return this._storage?.remove(key)
  }

  async waitForStorage() {
    while (!this.ready) await new Promise((resolve) => setTimeout(resolve, 250))
    return this._storage
  }
}
