/* Base Angular Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

/* Observables */
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/* Component Modules */
import { AppComponent } from './app.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { ConfirmComponent } from './user/confirm/confirm.component';
import { PlaceholderCreateComponent } from './api/placeholder-create/placeholder-create.component';

/* Services */
import { AuthService } from './user/auth.service';
import { RestService } from './api/rest.service';
/* import {UserRegistrationService} from './services/user-registration.service';
import {UserParametersService} from './services/user-parameters.service';
import {UserLoginService} from './services/user-login.service';
import {CognitoUtil} from './services/cognito.service';
import {AwsUtil} from './services/aws.service';
import {DynamoDBService} from './services/ddb.service'; */

/* Design Modules */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { FlexLayoutModule } from '@angular/flex-layout';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import 'hammerjs';

/* Amazon AWS SDK imports */
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';


/* Logged Out Components */
/* 
import {LoginComponent} from './logged_out/user/login/login.component';
import {RegisterComponent} from './logged_out/user/register/registration.component';
import {ForgotPassword2Component, ForgotPasswordStep1Component} from './logged_out/user/forgot/forgotPassword.component';
import {LogoutComponent, RegistrationConfirmationComponent} from './logged_out/user/confirm/confirmRegistration.component';
import {ResendCodeComponent} from './logged_out/user/resend/resendCode.component';
import {NewPasswordComponent} from './logged_out/user/newpassword/newpassword.component';
import { MFAComponent } from './logged_out/user/mfa/mfa.component'; */



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    AppRoutingModule,
  ],
  providers: [AuthService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
