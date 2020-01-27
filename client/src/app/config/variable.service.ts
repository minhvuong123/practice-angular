import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  loginStatus: boolean = false;
  loadingStatus: boolean = true;

  constructor() { }

  changeLoginStatus(value: boolean) {
    this.loginStatus = value;
  }

  changeloadingStatus(value: boolean) {
    this.loadingStatus= value;
  }
}
