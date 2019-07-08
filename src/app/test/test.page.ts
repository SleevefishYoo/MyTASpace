import {Component, OnInit} from '@angular/core';
import {BrightspaceService} from "../brightspace.service";
import * as PARAMS from '../cred.json'
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  userID: any;
  userKey: any;
  log = "Page Ready.";
  constructor(private brightspaceService: BrightspaceService,
              private http: HttpClient) {

  }

  ngOnInit() {
  }

  getIdKey() {
    prompt("Userid: "+ this.brightspaceService.getUserKey() + "\n UserKey: "+this.brightspaceService.getUserID());
  }

  setIdKey() {
    this.brightspaceService.setUserID(PARAMS.Session.userID);
    this.brightspaceService.setUserKey(PARAMS.Session.userKey);
    this.getIdKey()
  }

  CreateUserContext() {
    this.log = "isUserContextCreatable: " + this.brightspaceService.isUserContextCreatable();
    this.brightspaceService.createUserContext();
  }

  GenerateAuthURL() {
    this.log = this.brightspaceService.generateAuthURL();
  }
  GenerateWhoAMIURL() {
    this.log = this.brightspaceService.userContext.createAuthenticatedUrl('/d2l/api/lp/1.0/users/whoami','get');
    return this.log;
  }

  login(){
    this.brightspaceService.login();
  }

  whoAmI() {
    console.log("Gettingg response from:" + this.GenerateWhoAMIURL());
    this.http.get('https://'+this.GenerateWhoAMIURL()).subscribe((response) => {
      let res = {
        "Identifier": "",
        "FirstName": "",
        "LastName": "",
        "UniqueName": "",
        "ProfileIdentifier": ""
      };
      // @ts-ignore
      res = response;
      this.log = "Getting response...";
      this.log = String(res);
    });
  }
}
