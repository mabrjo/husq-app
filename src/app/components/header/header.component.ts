import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { UsersStoreService } from 'src/app/services/users-store.service';
import { User } from 'src/app/types/user';
import { ComposeComponent } from '../compose/compose.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  compose = ComposeComponent;
  activeUser: User;

  constructor(public dialog:MatDialog, public userStoreSerice: UsersStoreService) { 
    this.userStoreSerice.activeUser$.subscribe(user => this.activeUser = user);
  }

  openDialog(comp){
    this.dialog.open(comp);
  }

  logout() {
    this.userStoreSerice.logout();
  }

  ngOnInit(): void {
  }

}
