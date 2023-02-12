import { Component } from '@angular/core';
import { Config } from 'protractor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor() {
    console.log(environment.production); // Logs false for default environment
    // console.log(appConfigService.apiBaseUrl);

  }
  
  title = 'my-app';
}
