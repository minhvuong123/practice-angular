import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../config/api.service';
import { VariableService } from 'src/app/config/variable.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  result: any;

  constructor(
    private router: Router, 
    private apiService: ApiService,
    private variableService: VariableService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    Promise.resolve(null).then( _ => {
      this.variableService.changeloadingStatus(false);
      this.cdRef.detectChanges();
    })
  }

  onSubmit() {
    if(this.signInForm.status === "INVALID"){
      return ;
    }
    this.apiService.getUser(this.signInForm.value)
                  .subscribe(data => {
                    this.result = data;
                    if(this.result.user.length){
                      localStorage.setItem('login', JSON.stringify(true));
                      this.variableService.changeLoginStatus(true);

                      this.variableService.changeloadingStatus(true);

                      setInterval(() => {
                        this.variableService.changeloadingStatus(false);
                        this.router.navigate(['/home']);
                      }, 1000);
                     
                    }
                  });
   
  }

  redirect(){
    this.router.navigate(['/sign-up']);
  }

  getErrorMessage(value: string) {
    if (value === 'email') {
      return  this.signInForm.controls[value].hasError('required')
              ? 'You must enter a value'
              : this.signInForm.controls[value].hasError('email')
                ? 'Not a valid email'
                : ''
    }
    if (value === 'password') {
      return  this.signInForm.controls[value].hasError('required')
              ? 'You must enter a value'
              : this.signInForm.controls[value].hasError('minlength')
                ? 'min lenght 6 characters'
                : ''
    }
  }
}
