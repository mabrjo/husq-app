import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TimelineStoreService } from 'src/app/services/timeline-store.service';
import { UsersStoreService } from 'src/app/services/users-store.service';
import { Husq } from 'src/app/types/husq';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  public activeUser: User;
  @Input() husq: (Husq & User)[];


  constructor(public userStoreService: UsersStoreService,
    public timelineStore: TimelineStoreService) {
    this.userStoreService.activeUser$.subscribe(user => this.activeUser = user)
  }

  ngOnInit(): void {
  }

  identity(index: number, husq: Husq) {
    return husq.id;
  }

}
