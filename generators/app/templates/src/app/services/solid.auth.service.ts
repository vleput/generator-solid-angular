import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { currentSession, popupLogin, login } from 'solid-auth-client';

interface SolidSession {
  accessToken: string;
  clientId: string;
  idToken: string;
  sessionKey: string;
  webId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  session: Observable<SolidSession>;

  constructor(private router: Router) {
    this.isSessionActive();
  }

  /*
   * This will check if current session is active to avoid security problems
  */
  isSessionActive = async () => {
    this.session = from(currentSession());
  }

  solidLoginPopup = async () => {
    return popupLogin({ popupUri: './login'});
  }

  solidLogin = async (idp: string) => {
    return login(idp);
  }
}
