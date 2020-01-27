import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../config/api.service';
import { VariableService } from 'src/app/config/variable.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private router: Router,
    private apiServie: ApiService,
    private variableService: VariableService,
    private cdRef:ChangeDetectorRef,
  ) { }

  ngOnInit() {
    Promise.resolve(null).then( _ => {
      this.variableService.changeloadingStatus(false);
      this.cdRef.detectChanges();
    })
  }

  onSubmit() {
    if(this.signUpForm.status === "INVALID"){
      return ;
    }

 

    this.apiServie.addUser(this.signUpForm.value).subscribe( _ => {
      
      this.variableService.changeloadingStatus(true);

      setInterval(() => {
        this.variableService.changeloadingStatus(false);
        this.router.navigate(['/sign-in'])
      }, 1000);
      
    })
  }

  getErrorMessage(value: string) {
    if (value === 'firstName' || value === 'lastName') {
      return  this.signUpForm.controls[value].hasError('required')
              ? 'You must enter a value'
              :  ''
    }
    if (value === 'email') {
      return  this.signUpForm.controls[value].hasError('required')
              ? 'You must enter a value'
              : this.signUpForm.controls[value].hasError('email')
                ? 'Not a valid email'
                : ''
    }
    if (value === 'password') {
      return  this.signUpForm.controls[value].hasError('required')
              ? 'You must enter a value'
              : this.signUpForm.controls[value].hasError('minlength')
                ? 'min lenght 6 characters'
                : ''
    }
  }

  // addUser() {
  //    this.apiServie.addUser(this.signUpForm.value)
  // }

}
