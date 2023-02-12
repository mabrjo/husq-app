import { Component, OnChanges, OnInit } from '@angular/core';
import { FriendList } from 'src/app/types/friendList';
import { UsersStoreService } from 'src/app/services/users-store.service';
import { User } from 'src/app/types/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  public userAndFriends: FriendList;
  public friendsList: User[] = [];
  public columns: number = 2;
  public activeUser: User;
  followed: boolean = false;

  users: User[] = [];

  constructor(
    public userStoreService: UsersStoreService,
    public breakPointObserver: BreakpointObserver) {
    this.userStoreService.activeUser$.subscribe(user => this.activeUser = user);

    breakPointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).subscribe(data => {
      if (data.matches) {
        this.columns = 1;
      } else { this.columns = 2; }
    })
  }

  ngOnInit(): void {
    this.users = this.userStoreService.users;
  }

  followUser(followedUser: User) {
    if (this.activeUser && followedUser) {
      this.userStoreService.followUser(this.activeUser.id, followedUser.id);
    }
  }

}
