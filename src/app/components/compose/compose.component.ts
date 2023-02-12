import { Component, OnInit } from '@angular/core';
import { TimelineStoreService } from 'src/app/services/timeline-store.service';
import { Husq } from 'src/app/types/husq';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { HusqComponent } from '../husq/husq.component';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from 'src/helpers/date';
import { UsersStoreService } from 'src/app/services/users-store.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  newHusq: FormGroup
  activeUser: User;

  constructor(public timelineStore: TimelineStoreService, private formbuilder: FormBuilder, private userStoreService: UsersStoreService) {
    this.newHusq = this.formbuilder.group({
      message: new FormControl('', [Validators.required, Validators.maxLength(30)] )
    })
    this.userStoreService.activeUser$.subscribe(user => this.activeUser = user)
  }



  ngOnInit(): void {
  }

  addHusq() {
    if (this.newHusq.valid) {
    this.timelineStore.addHusq({
      id: null,
      date: formatDate(),
      userId: this.activeUser.id,
      message: this.newHusq.get("message").value,
      parentId: null
      });
      this.newHusq.reset();
    }
  }

}
