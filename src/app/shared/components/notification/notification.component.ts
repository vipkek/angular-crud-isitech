import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, Notification } from '../../../core/services/notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit, OnDestroy {
  notification: Notification | null = null;
  private subscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notification$.subscribe(
      notification => {
        this.notification = notification as Notification | null;
        if (notification) {
          setTimeout(() => {
            this.notification = null;
          }, 3000);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
