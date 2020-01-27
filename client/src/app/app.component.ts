import { Component, OnInit } from '@angular/core';
import { VariableService } from './config/variable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private variableService: VariableService
  ){}

  ngOnInit() {
    
  }

}
