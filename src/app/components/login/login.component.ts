import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TimelineStoreService } from 'src/app/services/timeline-store.service';
import { UsersStoreService } from 'src/app/services/users-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;

  constructor(public userStoreService: UsersStoreService, private formbuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formbuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.userStoreService.loginUser( this.loginForm.get('name').value , this.loginForm.get('password').value );
      this.router.navigate(["/timeline"]);
    }
  }

}
