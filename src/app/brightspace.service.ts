import {Injectable} from '@angular/core';
import * as PARAMS from './cred.json'
import {Storage} from "@ionic/storage";
import { Subject } from 'rxjs/Subject';
import {ApplicationContext, UserContext, Util} from "./Module/valence/lib/valence";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrightspaceService {
  private appID = PARAMS.Brightspace.appID;
  private appKey = PARAMS.Brightspace.appKey;
  private userID = '';
  private userKey = '';
  private sessionSkew = '';
  private redirectedURL = '';
  private userIDSubject: Subject<String>  = new Subject<String>();
  private userKeySubject: Subject<String> = new Subject<String>();
  private sessionSkewSubject: Subject<String> = new Subject<String>();


  private CALLBACK_PARAM = 'https://apitesttool.desire2learnvalence.com/';
  public authenticated = false;
  private appContext: ApplicationContext;
  public userContext: UserContext;
  constructor(private storage: Storage,
              private iab: InAppBrowser,
              private http: HttpClient) {
    this.appContext = new ApplicationContext(this.appID, this.appKey);

    storage.get("userID").then(userID =>
    {
      this.userID = userID;
      if(this.isUserContextCreatable()) this.userContext = this.appContext.createUserContextWithValues(PARAMS.Brightspace.Host,443,this.userID,this.userKey,this.sessionSkew);
    });
    storage.get("userKey").then(userKey =>
    {
      this.userKey = userKey;
      if(this.isUserContextCreatable()) this.userContext = this.appContext.createUserContextWithValues(PARAMS.Brightspace.Host,443,this.userID,this.userKey,this.sessionSkew);
    });
    storage.get("sessionSkew").then(sessionSkew =>
    {
      this.sessionSkew = sessionSkew;
      if(this.isUserContextCreatable()) this.userContext = this.appContext.createUserContextWithValues(PARAMS.Brightspace.Host,443,this.userID,this.userKey,this.sessionSkew);
    });
  }
  getUserID(){
    return this.userID;
  }

  getUserKey(){
    return this.userKey;
  }

  login(){
    const browser = this.iab.create('https://'+this.generateAuthURL(), '_blank', {
      location: 'no',
      zoom: 'no',
    });
    browser.on('loadstart').subscribe(
      data => {
        let url = data.url;
          if(url.indexOf("&x_c=") != -1){
            prompt("Success.")
            let params = ((url).split("?")[1]).split("&");
            this.setUserID(params[0]);
            this.setUserKey(params[1]);
            prompt("Userid: "+ params[0] + "\n UserKey: "+params[1]);
            this.redirectedURL = url;
            browser.hide();
          }
      });
  }

  generateAuthURL() {
    return this.appContext.createUrlForAuthentication(PARAMS.Brightspace.Host, 443, this.CALLBACK_PARAM);
  }

  setUserID(userID: string) {
    this.userID = userID;
    console.log("setting userid to:"+ this.userID);
    this.userIDSubject.next("New UserID");
  }

  setUserKey(UserKey: string) {
    this.userKey = UserKey;
    console.log("setting userKey to:"+ this.userKey);
    this.userKeySubject.next("New UserKey");
  }

  setSessionSkew(sessionSkew: string) {
    this.sessionSkew = sessionSkew;
    console.log("setting sessionSkew to:"+ this.sessionSkew);
    this.sessionSkewSubject.next("New UserKey");
  }



  /**
   * This function determines whether creating a new userContext could be done.
   * The function will return true when:
   * userContext is not created & userID, userKey & sessionSkew are set.
   * @private
   * @return boolean
   */
  public isUserContextCreatable(): boolean {
    return this.userContext == null && this.userID != null && this.userKey != null;
  }

  /**
   * Determines whether the current userContext created is valid on the server side,
   * and update the flag (authenticated: boolean) accordingly
   */
  public async validateSession(){
    if(this.userContext == null) return false;
    let url = this.userContext.createAuthenticatedUrl('/d2l/api/lp/1.0/users/whoami','get');
    console.log("Testingg if current userContext is Valid: Getting response from:" + url);
    this.http.get('https://'+url).subscribe((response) => {
      let res = {
        "Identifier": "",
        "FirstName": "",
        "LastName": "",
        "UniqueName": "",
        "ProfileIdentifier": ""
      }
      // @ts-ignore
      res = (response);
    });
  }

  public createUserContext(){
    console.log("Creating User Context. isUserContextCreatable() = "+this.isUserContextCreatable());
    if(this.isUserContextCreatable()){
      let skew = Util.calculateSkew(this.redirectedURL);
      console.log("Calculated Skew from returning url: "+skew);
      this.userContext = this.appContext.createUserContext(PARAMS.Brightspace.Host,443,this.redirectedURL, skew);
    }
  }
}
