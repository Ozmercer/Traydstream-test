import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraydStreamService {
  _ids = new BehaviorSubject<string[]>([]);

  constructor() { }

  get UUIDs$() {
    return this._ids.asObservable();
  }

  get UUIDs() {
    return this._ids.getValue();
  }

  set UUIDs(ids: string[]) {
    this._ids.next(ids);
  }
}
