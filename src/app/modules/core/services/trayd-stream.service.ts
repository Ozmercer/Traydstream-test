import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraydStreamService {
  _UUIDs = new BehaviorSubject<string[]>([]);

  constructor() {}
   get UUIDs() {
     return this._UUIDs.getValue();
   }

   get UUIDs$() {
     return this._UUIDs.asObservable();
   }

   set UUIDs(ids: string[]) {
     this._UUIDs.next(ids);
   }
}
