import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  public notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
    this.showNotification({ message, type: 'success' });
  }

  showError(message: string) {
    this.showNotification({ message, type: 'error' });
  }

  private showNotification(notification: Notification) {
    this.notificationSubject.next(notification);

    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 3000);
  }
}
