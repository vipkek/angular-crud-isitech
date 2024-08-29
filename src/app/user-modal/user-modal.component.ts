import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { CustomValidatorsService } from '../core/services/custom-validators.service';
import { UserModel } from '../core/interface/models';
import { generateRandID } from '../core/utils/generic';
import { NotificationService } from '../core/services/notification.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent implements OnChanges {

  @Input()
  isOpen = false;

  @Input()
  selectedUser: UserModel | null = null;

  @Output()
  onSubmit = new EventEmitter<UserModel>();

  @Output()
  onDelete= new EventEmitter<string>();

  @Output()
  onEdit= new EventEmitter<UserModel>();

  @Output()
  close = new EventEmitter<void>();

  form = new FormGroup({
    username: new FormControl<string>(
      '', [
        Validators.required],
      [this.customValidators.usernameValidator()
      ]
    ),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>(
      '', [
        Validators.required,
        Validators.minLength(8), this.customValidators.passwordValidator()
      ]
    ),
    repeatPassword: new FormControl<string>('', [Validators.required]),
    userType: new FormControl<'Admin' | 'Driver'>('Driver', [Validators.required]),
  }, {
    validators: this.customValidators.confirmedValidator('password', 'repeatPassword'),
  });

  constructor(private userService: UserService,
              private customValidators: CustomValidatorsService,
              private notificationService: NotificationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && this.selectedUser) {
      this.form.setValue({
        username: this.selectedUser.username,
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        email: this.selectedUser.email,
        password: this.selectedUser.password,
        repeatPassword: this.selectedUser.password,
        userType: this.selectedUser.userType
      });
    }
  }

  submit(): void {
    if (!this.form.valid) {
      this.notificationService.showError('Check form fields!');
      this.form.enable();
      return;
    }

    const data = {
      id: generateRandID(),
      ...this.form.value
    } as UserModel;

    this.userService.createUser(data)
      .pipe(
        catchError(e => {
          this.notificationService.showError('Error erupted due User creation');
          return throwError(() => e);
        })
      )
      .subscribe((res: UserModel) => {
        this.onSubmit.emit(res);
        this.notificationService.showSuccess('User successfully added!');

        this.clearForm();
        this.closeModal();
      })
  }

  delete() {
    if (!this.selectedUser?.username) {
      return;
    }

    this.userService.deleteUser(this.selectedUser.username)
      .pipe(
        catchError(e => {
          this.notificationService.showError('Error erupted due User deletion');
          return throwError(() => e);
        })
      )
      .subscribe((username) => {
        this.notificationService.showSuccess('User successfully deleted!');
        this.onDelete.emit(username);

        this.clearForm();
        this.closeModal();
      })
  }

  edit() {
    if (!this.form.valid) {
      this.notificationService.showError('Check form fields!');
      this.form.enable();
      return;
    }

    const data = {
      id: this.selectedUser?.id,
      ...this.form.value
    } as UserModel;

    this.userService.updateUser(data)
      .pipe(
        catchError(e => {
          this.notificationService.showError('Error erupted due User updating');
          return throwError(() => e);
        })
      )
      .subscribe((res: UserModel) => {
        this.notificationService.showSuccess('User successfully updated!');
        this.onEdit.emit(res);

        this.closeModal();
      })
  }

  clearForm() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  closeModal() {
    this.close.emit();
  }
}
