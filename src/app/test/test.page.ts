import {Component, OnInit} from '@angular/core';
import {BrightspaceService} from '../brightspace.service';
import * as PARAMS from '../cred.json';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  log = 'Page Ready.';

  constructor(private brightspaceService: BrightspaceService,
              private http: HttpClient) {

  }

  ngOnInit() {
  }

  getIdKey() {
    prompt('Userid: ' + this.brightspaceService.getUserKey() + '\n UserKey: ' + this.brightspaceService.getUserID()+'\n Skew: '+this.brightspaceService.getSkew());
  }

  setIdKey() {
    this.brightspaceService.setUserID(PARAMS.Session.userID);
    this.brightspaceService.setUserKey(PARAMS.Session.userKey);
    this.brightspaceService.redirectedURL = PARAMS.Session.CallBackURLWithParams;
    this.brightspaceService.setSessionSkew(this.brightspaceService.calcSkew());
  }

  CreateUserContext() {
    this.log = 'isUserContextCreatable: ' + this.brightspaceService.isUserContextCreatable();
    this.brightspaceService.createUserContext();
  }

  GenerateAuthURL() {
    this.log = this.brightspaceService.generateAuthURL();
  }

  GenerateWhoAMIURL() {
    this.log = this.brightspaceService.userContext.createAuthenticatedUrl('/d2l/api/lp/1.0/users/whoami', 'get');
    return this.log;
  }

  login() {
    this.brightspaceService.login();
  }

  whoAmI() {
    console.log('Getting response from:' + this.GenerateWhoAMIURL()); 
    this.http.get('https://' + this.GenerateWhoAMIURL()).subscribe((response: UserResponse) => {
      this.log = 'User Unique Name: ' + response.UniqueName;
    },
    (error: HttpErrorResponse) => {
      this.log = 'Error Status: ' + error.status + '\nError Text: ' + error.message;
    });
  }

  calcSkew() {
    prompt(this.brightspaceService.calcSkew());
    this.log = this.brightspaceService.redirectedURL;
  }

}

interface UserResponse {
  Identifier: string;
  FirstName: string;
  LastName: string;
  UniqueName: string;
  ProfileIdentifier: string;
}
