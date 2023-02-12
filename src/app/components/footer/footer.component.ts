import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { MoreComponent } from '../more/more.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  terms = TermsOfServiceComponent;
  privacy = PrivacyComponent;
  more = MoreComponent;

  constructor(public dialog:MatDialog) { }

  openDialog(comp){
    this.dialog.open(comp);
  }
  ngOnInit(): void {
  }

}

