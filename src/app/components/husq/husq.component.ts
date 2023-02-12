import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TimelineStoreService } from 'src/app/services/timeline-store.service';
import { UsersStoreService } from 'src/app/services/users-store.service';
import { Husq } from 'src/app/types/husq';
import { User } from 'src/app/types/user';
import { formatDate } from 'src/helpers/date';

@Component({
  selector: 'app-husq',
  templateUrl: './husq.component.html',
  styleUrls: ['./husq.component.css']
})

export class HusqComponent implements OnInit {
  replies: any;

  constructor(public timelineStore: TimelineStoreService, private formbuilder: FormBuilder, private userStoreSerice: UsersStoreService) {
    this.husqReply = this.formbuilder.group({
      message: ['', [Validators.required, Validators.maxLength(120)]]
    })
    this.editHusqForm = this.formbuilder.group({
      message: ['', [Validators.required, Validators.maxLength(120)]]
    })
    this.userStoreSerice.activeUser$.subscribe(user => this.activeUser = user)
  }
  
  @Input() husq: (Husq & User);
  husqReply: FormGroup
  editHusqForm: FormGroup
  activeUser: User;
  edit: boolean = false;
  editButton: any = 'Edit';

  ngOnInit(): void {
  }

  // DELETE and EDIT FUNCTIONS

  editHusq(husq: Husq) {
    if (this.activeUser.id == this.husq.userId) {
      if (this.editHusqForm.valid) {
        this.timelineStore.editHusq({
          id: husq.id,
          date: husq.date,
          userId: husq.userId,
          message: this.editHusqForm.get("message").value,
          parentId: husq.parentId
        });
        // this.editHusqForm.reset()
        // this.husqReply.get("message").markAsUntouched
      }
    } else {
      alert("Don't try to hack things bro")
    }
  }

  removeHusq(husq: Husq) {
    // this validates if the user is active so you can't delete someone else's husqs
    if (this.activeUser.id == this.husq.userId) {
      this.timelineStore.removeHusq({
        id: husq.id,
        date: husq.date,
        userId: husq.userId,
        message: "THIS HUSQ HAS BEEN DELETED",
        parentId: husq.parentId
      });
    } else {
      alert("Tsk tsk tsk")
    }
  }

  // REPLY FUNCTIONS

  replyToHusq(husqId: number) {
    if (this.husqReply.valid) {
      this.timelineStore.addHusq({
        id: null,
        date: formatDate(),
        userId: this.activeUser.id,
        message: this.husqReply.get("message").value,
        parentId: husqId
      });
      this.husqReply.reset()
      this.husqReply.get("message").markAsUntouched
    }
  }

  identity(index: number, husq: Husq) {
    return husq.id;
  }

  // EDIT TOGGLE BUTTON FUNCTION
  editToggle() {
    
    this.edit = !this.edit;

    if(this.edit) {
      this.editButton = "Cancel";
    } else {
      this.editButton = "Edit";
    }
  }

}


// Old remove husk function designed to delete husq on backend.
  // removeHusq(id: number) {
  //   // this validates if the user is active so you can't delete someone else's husqs
  //   if (this.activeUser.id == this.husq.userId) {
  //     this.timelineStore.removeHusq(id);
  //   } else {
  //     alert("Tsk tsk tsk")
  //   }
  // }
