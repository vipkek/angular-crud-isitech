import { Directive, Input, OnInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

const ERROR_MESSAGES: { [key: string]: string } = {
  required: 'This field is required.',
  invalid: `Please provide a correct field.`,
  email: 'Invalid email.',
  passwordInvalid: 'Password must include at least one letter and one number.',
  minlength: 'Text is too short',
  passwordsMismatch: 'Passwords mismatch!'
};

@Directive({
  selector: '[inputError]'
})

export class InputErrorDirective implements OnInit, OnDestroy {
  @Input('inputErrorControl')
  controlName: string = '';

  @Input()
  formGroup: FormGroup = new FormGroup({});

  private statusChangesSubscription: Subscription | null = null;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {}

  ngOnInit() {
    const control = this.formGroup.get(this.controlName) as AbstractControl;
    this.statusChangesSubscription = control.statusChanges.subscribe(() => {
      this.setErrorMessages(control);
    });
  }

  ngOnDestroy() {
    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }
  }

  setErrorMessages(control: AbstractControl) {
    const errors = control.errors;
    const errorMessages = this.getErrorMessages(errors);
    this.displayErrorMessages(errorMessages);
  }

  getErrorMessages(errors: any): string[] {
    if (!errors) return [];

    return Object.keys(errors)
      .map(errorKey => ERROR_MESSAGES[errorKey])
      .filter(message => !!message);
  }

  displayErrorMessages(errorMessages: string[]) {
    const parent = this.el.nativeElement.parentElement;
    const errorContainer = parent.querySelector('.form-error');

    if (errorContainer) {
      this.renderer.setProperty(errorContainer, 'innerHTML', '');
      errorMessages.forEach(message => {
        const div = this.renderer.createElement('div');
        const text = this.renderer.createText(message);
        this.renderer.appendChild(div, text);
        this.renderer.appendChild(errorContainer, div);
      });
    }
  }
}
