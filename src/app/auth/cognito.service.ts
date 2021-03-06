/* Base Angular */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* My Files/Modules/Services */
import { environment, cognitoCredentials } from '../../environments/environment';
import { UIService } from '../shared/ui.service';
import { MatSnackBar } from '@angular/material';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Authorize from './state/auth.actions';

/* Special */
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import Amplify, { Auth } from 'aws-amplify';
import AuthClass from 'aws-amplify/lib/Auth/Auth';
import { User } from 'aws-amplify/node_modules/aws-sdk/clients/mq';

Amplify.configure(cognitoCredentials);

@Injectable()
export class CognitoService {
  registeredUser: User;
  constructor(
    private router:  Router,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
    private auth: AuthClass
  ) {}

  initAuth() {
    this.isAuthenticated().subscribe(
      (auth) => {
        if (auth) {
          this.store.dispatch(new Authorize.SetAuthenticated());
        } else {
          this.store.dispatch(new Authorize.SetUnauthenticated());
        }
      }
    );
  }

  createNewUser(username: string, password: string, email: string) {
    this.auth.signUp({
      username,
      password,
      attributes: {
        email
      },
      validationData: []
    })
    .then(data => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(data.message, null, 5000);
    })
    .catch(err => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 5000);
    });
  }

  confirmNewUser(username: string, code: string) {
    this.store.dispatch(new UI.StartLoading());
    this.auth.confirmSignUp(username, code)
    .then(data => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(data.message, null, 5000);
      this.store.dispatch(new Authorize.SetAuthenticated());
    })
    .catch(err => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 5000);
    });
  }

  login(username: string, password: string) {
    this.auth.signIn(username, password)
    .then(data => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(data.message, null, 5000);
      this.store.dispatch(new Authorize.SetAuthenticated());
    })
    .catch(err => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 5000);
    });
  }

/*   confirmWithMFA(user, code) {
    this.auth.confirmSignIn(user, code)
    .then(data => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(data.message, null, 5000);
    })
    .catch(err => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 5000);
    });
  } */

  logout() {
    this.auth.signOut()
    .then(data => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(data.message, null, 5000);
      this.store.dispatch(new Authorize.SetUnauthenticated());
    })
    .catch(err => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 5000);
    });
  }

  sendResetPasswordEmail(username: string) {
    this.auth.forgotPassword(username)
      .then(data => this.uiService.showSnackbar(data, null, 5000))
      .catch(err => this.uiService.showSnackbar(err, null, 5000));
  }

  resetPasswordSubmit(username, code, newPassword) {
    this.auth.forgotPasswordSubmit(username, code, newPassword)
      .then(data => this.uiService.showSnackbar(data, null, 5000))
      .catch(err => this.uiService.showSnackbar(err, null, 5000));
  }

  getSessionTokens() {
    return this.auth.currentSession();
  }

/*   setTypeOfMFA(user: User, type: string) {
    this.auth.setPreferredMFA(user, type)
      .then(data => this.uiService.showSnackbar(data, null, 5000))
      .catch(err => this.uiService.showSnackbar(err, null, 5000));
  } */

  setNewPassword(user, oldPassword, newPassword) {
    this.auth.forgotPasswordSubmit(user, oldPassword, newPassword)
    .then(data => this.uiService.showSnackbar(data, null, 5000))
    .catch(err => this.uiService.showSnackbar(err, null, 5000));
  }

  getAuthenticatedUser() {
    this.auth.currentAuthenticatedUser()
      .then(data => data)
      .catch(err => err);
  }

  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(false);
      } else {
        observer.next(true);
      }
      observer.complete();
    });
    return obs;
  }
}
