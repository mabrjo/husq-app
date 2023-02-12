import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent} from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { TimelineComponent } from './components/timeline/timeline.component';
import { HusqComponent } from './components/husq/husq.component';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { MoreComponent } from './components/more/more.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { ComposeComponent } from './components/compose/compose.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/authguard';
import { TimelineHusqsPipe } from './pipes/timeline-husqs.pipe';
import { HttpClientModule } from '@angular/common/http';
import { SearchpageComponent } from './components/searchpage/searchpage.component';
import { ENVIRONMENT } from './services/environment.service';
import { environment } from 'src/environments/environment';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TimelineComponent,
    HusqComponent,
    TermsOfServiceComponent,
    PrivacyComponent,
    MoreComponent,
    ComposeComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    TimelineHusqsPipe,
    SearchpageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot([ 
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'timeline', component: TimelineComponent, canActivate:[AuthGuardService]},
    {path: 'terms-of-service', component: TermsOfServiceComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'more', component: MoreComponent},
    {path: 'searchpage', component: SearchpageComponent, canActivate:[AuthGuardService]},
    {path: 'compose', component: ComposeComponent},
    {path: 'profile/:id', component: ProfileComponent, canActivate:[AuthGuardService]}
    
     ]),
    



  ],
  providers: [AuthGuardService, {provide: ENVIRONMENT, useValue: environment}],
  bootstrap: [AppComponent]
})
export class AppModule { }
