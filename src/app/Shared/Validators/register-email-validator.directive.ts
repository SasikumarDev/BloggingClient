import { BloggerService } from './../blogger.service';
import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appRegisterEmailValidator]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: RegisterEmailValidatorDirective, multi: true }
  ]
})
export class RegisterEmailValidatorDirective implements Validator {
  isava ;
  constructor(private Service: BloggerService) { }
  async validate(control: AbstractControl) {
    await this.Service.CheckEmilIDonRegister(control.value).toPromise().then(res => {
      console.log(`Block ${res}`);
      this.isava = res;
    }, err => {
      console.log('Error');
    });
    if (this.isava === true) {
      return { appRegisterEmailValidator: true };
    } else {
      return null;
    }
  }
}
