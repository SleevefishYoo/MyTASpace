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
  public redirectedURL = '';
  private userIDSubject: Subject<String>  = new Subject<String>();
  private userKeySubject: Subject<String> = new Subject<String>();
  private sessionSkewSubject: Subject<String> = new Subject<String>();


  private CALLBACK_PARAM = 'https://apitesttool.desire2learnvalence.com/';
  public authenticated = false;
  private appContext: ApplicationContext;
  public userContext: UserContext;

  /**
   * Setting up the service.
   * 1. Initialize an Application Context.
   * 2. Requests previous session info from storage any try to create a UserContext if possible.
   * 3. Setup subscriptions to sync ID, Key, Skew to Storage from instance. Use setID/Key/Skew Helper
   *    Functions please.
   * @param storage
   * @param iab
   * @param http
   */
  constructor(private storage: Storage,
              private iab: InAppBrowser,
              private http: HttpClient) {
    this.appContext = new ApplicationContext(this.appID, this.appKey);

    storage.get("userID").then(userID => {
      this.userID = userID;
      this.createUserContext();
    });
    storage.get("userKey").then(userKey => {
      this.userKey = userKey;
      this.createUserContext();
    });
    storage.get("sessionSkew").then(sessionSkew => {
      this.sessionSkew = sessionSkew;
      this.createUserContext();
    });

    this.userIDSubject.asObservable().subscribe(() => {
      this.storage.set("userID", this.userID);
    });

    this.userKeySubject.asObservable().subscribe(() => {
      this.storage.set("userKey", this.userKey);
    });

    this.sessionSkewSubject.asObservable().subscribe(() => {
      this.storage.set("sessionSkew", this.sessionSkew);
    });
  }

  /**
   * Get Current userID
   */
  getUserID() {
    return this.userID;
  }

  /**
   * Get Current userKey
   */
  getUserKey() {
    return this.userKey;
  }

  /**
   * Get Current sessionSkew
   */
  getSkew() {
    return this.sessionSkew;
  }

  /**
   * Create a Authentication url, then open up a browser page and listen for a valid session key in the url.
   * The funcion will return, create a new userContext and lead user to the main page when user log in successfully,
   * will return and remain on current page if user decides to go back.
   *
   * Should only be called on welcome-slide.
   */
  login() {
    const browser = this.iab.create('https://' + this.generateAuthURL(), '_blank', {
      location: 'no',
      zoom: 'no',
    });
    browser.on('loadstart').subscribe(
      data => {
        let url = data.url;
        if (url.indexOf("&x_c=") != -1) {
          browser.hide();
          prompt("Success.")
          let params = ((url).split("?")[1]).split("&");
          this.setUserID(params[0].split('=')[1]);
          this.setUserKey(params[1].split('=')[1]);
          this.setSessionSkew(Util.calculateSkew(url));
          prompt("Userid: " + params[0].split('=')[1] + "\n UserKey: " + params[1].split('=')[1] + "\n Skew: " + Util.calculateSkew(url));
          this.redirectedURL = url;
        }
      });
  }

  /**
   * returns a url for user to authenticate on.
   */
  generateAuthURL(): string {
    return this.appContext.createUrlForAuthentication(PARAMS.Brightspace.Host, 443, this.CALLBACK_PARAM);
  }

  /**
   * @return Skew calculated from the last returned URL.
   */
  calcSkew(): string{
    return Util.calculateSkew(this.redirectedURL);
  }

  /**
   * sets the current userID both in the instance and Storage.
   * @param userID userID you wish to set
   */
  setUserID(userID: string) {
    this.userID = userID;
    console.log("setting userid to:" + this.userID);
    this.userIDSubject.next("New UserID");
  }

  /**
   * sets the current UserKey both in the instance and Storage.
   * @param UserKey UserKey you wish to set
   */
  setUserKey(UserKey: string) {
    this.userKey = UserKey;
    console.log("setting userKey to:" + this.userKey);
    this.userKeySubject.next("New UserKey");
  }

  /**
   * sets the current sessionSkew both in the instance and Storage.
   * @param sessionSkew sessionSkew you wish to set
   */
  setSessionSkew(sessionSkew: string) {
    this.sessionSkew = sessionSkew;
    console.log("setting sessionSkew to:" + this.sessionSkew);
    this.sessionSkewSubject.next("New skew");
  }


  /**
   * This function determines whether creating a new userContext could be done.
   * The function will return true when:
   * userContext is not created & userID, userKey & sessionSkew are set.
   * @private
   * @return boolean
   */
  public isUserContextCreatable(): boolean {
    return this.userID != null && this.userKey != null && this.sessionSkew != null;
  }

  /**
   * Determines whether the current userContext created is valid on the server side,
   * and kick user out of the app if session is no longer valid.
   * TODO:Finish it.
   */
  public async validateSession() {
    let url = this.userContext.createAuthenticatedUrl('/d2l/api/lp/1.0/users/whoami', 'get');
    console.log("Testingg if current userContext is Valid: Getting response from:" + url);
    await this.http.get('https://' + url).subscribe((response) => {
      console.log("Session Valid");
      this.authenticated = true;
      return true;
      // @ts-ignore
      res = (response);
    });
    this.authenticated = false;
    return true;
  }

  /**
   * Create a new userContext using the userID, Key, Skew set in the instance. Then call validateSession
   * to check if current session info is still recognized by the server.
   */
  public createUserContext() {
    console.log("Trying to create User Context. isUserContextCreatable() = " + this.isUserContextCreatable());
    if (this.isUserContextCreatable()) {
      console.log("Creating user Context with ID:"+this.userID+" Key:"+this.userKey+" Skew:"+this.sessionSkew);
      this.userContext = this.appContext.createUserContextWithValues(PARAMS.Brightspace.Host, 443, this.userID, this.userKey, this.sessionSkew);
      // this.validateSession(); TODO: Uncomment this.
    }
  }

  /**
   * Clear session info and kick user back to welcome page.
   * @param option 0: Current session info no longer valid; 1: User-initiated logout.
   * When option 0 is provided, the cookies stored in InAppBrowser will not be flushed so user could login without re-entering password.
   * When option 1 is provided, the cookies stored in InAppBrowser WILL be flushed so a new user could log in.
   */
  public logout(option: number) {
    //TODO: Kick user back to welcomeSlide/login page, AuthGuard
    this.userContext = null;
    this.setSessionSkew(null);
    this.setUserKey(null);
    this.setUserID(null);
    if(option == 1){
      //TODO: Clear cookies of IAB.
    }
  }
}
