import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TimelineStoreService } from 'src/app/services/timeline-store.service';
import { UsersStoreService } from 'src/app/services/users-store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(public userStoreService: UsersStoreService, private formbuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formbuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      bio: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.registerForm.valid) {
      this.userStoreService.addUser({
        name: this.registerForm.get('name').value,
        password: this.registerForm.get('password').value, 
        bio: this.registerForm.get('bio').value,
        profilePic: '../../../assets/img/default-person.png'
      } );
    }
  }

}
                                    