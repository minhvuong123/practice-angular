import { Component, OnInit } from '@angular/core';
import { VariableService } from 'src/app/config/variable.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(
    private variableService: VariableService
  ) { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('login')) === true){ 
      this.variableService.changeLoginStatus(true);
    }
  }

  logOut() {
    localStorage.setItem('login', JSON.stringify(false));
    this.variableService.changeLoginStatus(false);
  }

}
