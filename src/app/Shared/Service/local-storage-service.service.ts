import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {
  private Storagesub = new Subject<{ key: string, value: any }>();
  EmmitKey = new EventEmitter<string>();
  constructor() {
    this.Start();
   }
  WatchStorage(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      let keys = event.key;
      this.EmmitKey.emit(keys);
    }
  }
  Start() {
    window.addEventListener('storage', this.WatchStorage.bind(this));
  }
}
