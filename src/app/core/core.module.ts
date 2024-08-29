import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { CustomValidatorsService } from './services/custom-validators.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    UserService,
    CustomValidatorsService,
    NotificationService
  ],
  declarations: []
})
export class CoreModule {
}
