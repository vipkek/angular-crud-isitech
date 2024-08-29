import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomValidatorsService {
  constructor(private userService: UserService) {}

  confirmedValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(controlName);
      const repeatPasswordControl = formGroup.get(matchingControlName);

      if (!passwordControl || !repeatPasswordControl) {
        return null;
      }

      const password = passwordControl.value;
      const repeatPassword = repeatPasswordControl.value;

      if (repeatPasswordControl.errors && !repeatPasswordControl.errors['passwordsMismatch']) {
        return null;
      }

      if (password !== repeatPassword) {
        repeatPasswordControl.setErrors({ passwordsMismatch: true });
      } else {
        repeatPasswordControl.setErrors(null);
      }

      return null;
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasNumber = /\d/.test(value);
      const hasLetter = /[a-zA-Z]/.test(value);

      if (!hasNumber || !hasLetter) {
        return { passwordInvalid: true };
      }

      return null;
    };
  }

  usernameValidator(): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return of(control.value).pipe(
        debounceTime(200),
        switchMap(value => (
          this.userService.checkUser(value)
            .pipe(
              map(response => (response.isAvailable ? null : {invalid: true})),
              catchError(() => of(null))
            )
          ))
      );
    };
  }
}
