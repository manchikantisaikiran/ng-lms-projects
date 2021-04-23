import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationData } from './notificaton-data.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification$: Subject<NotificationData> = new Subject();



  constructor() { }

  get notifications() {
    return this.notification$.asObservable()
  }

  show(text: string, duration = 5000) {
    this.notification$.next({ text, duration });
  }

}
