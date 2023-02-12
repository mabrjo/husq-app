import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { id } from 'date-fns/locale';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TimelineStoreService } from 'src/app/services/timeline-store.service';
import { UsersStoreService } from 'src/app/services/users-store.service';
import { Husq } from 'src/app/types/husq';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile: User;
  public friends: User[];
  public following: User[];
  public husqs: Husq[];
  public activeUser: User;
  updateProfilePicForm: FormGroup;
  edit: boolean = false;
  editButton: any = 'Edit';

  constructor(
    private route: ActivatedRoute,
    private userStoreService: UsersStoreService,
    private timelineStoreService: TimelineStoreService,
    private formbuilder: FormBuilder
  ) {
    this.updateProfilePicForm = this.formbuilder.group({
      url: ['', [Validators.required]]
    })
    this.refreshActiveUser();
    console.log(this.activeUser);
    console.log(this.profile);
  }

  ngOnInit(): void {
    this.getProfile();
  }

  // This gets the profile for whoever's page this is.

  getProfile(): void {
    this.route.paramMap.subscribe(param => {
      this.profile = this.userStoreService.getByID(+param.get('id'));
      // This is where the Following List is created
      this.following = this.profile.following.map(follow => this.userStoreService.getByID(follow));

      this.husqs = this.timelineStoreService.husqs.filter(husq => husq.userId === +param.get('id'));
    })
  }

  // REFRESH FUNCTION
  refreshActiveUser() {
    this.userStoreService.activeUser$.subscribe(user => this.activeUser = user);
  }

  // UPDATE FUNCTIONS
  updateProfilePic(user: User) {
    console.log(this.updateProfilePicForm.get("url").value);
    if (this.activeUser.id == user.id) {
      if (this.updateProfilePicForm.valid) {
        this.userStoreService.updateUser({
          id: user.id,
          name: user.name,
          bio: user.bio,
          profilePic: this.updateProfilePicForm.get("url").value,
          password: user.password,
          following: user.following
        })
        this.refreshActiveUser();
      }
    } else {
      alert("Don't even try it buddy")
    }

  }

  // FOLLOW FUNCTIONS

  followUser(followedUser: User) {
    if (this.activeUser && followedUser) {
      this.userStoreService.isFollowing(this.activeUser.id, followedUser.id);
    }
  }

  unFollowUser(friendId: number): void {
    this.userStoreService.unFollowUser(this.activeUser.id, friendId);
  }


  // EDIT TOGGLE BUTTON FUNCTION
  editToggle() {
    
    this.edit = !this.edit;

    if(this.edit) {
      this.editButton = "Cancel";
    } else {
      this.editButton = "Edit Profile";
    }
  }


}
