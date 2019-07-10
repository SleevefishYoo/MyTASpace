import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.page.html',
  styleUrls: ['./grading.page.scss'],
})
export class GradingPage implements OnInit {
  searching = true;
  gradingUsers: Array<{ Name; WLUID: string; WLUEmail: string; gradeItemId: string; gradeOutOf: string; currGrade: string }> = [];
  searchTerm: any;
  courseID = null;
  gradeItemID = null;
  maxGrade = null;
  allowExceed = null;

  constructor(
    private orgService: OrganizationService,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute
  ) {
    this.gradingUsers = orgService.gradingUsersFiltered;
    this.courseID = this.activatedRoute.snapshot.paramMap.get('courseID');
    this.gradeItemID = this.activatedRoute.snapshot.paramMap.get('gradeItemID');
    this.maxGrade = Number(this.activatedRoute.snapshot.paramMap.get('maxGrade'));
    this.allowExceed = this.activatedRoute.snapshot.paramMap.get('allowExceed') === 'true';
    console.log('course: ' + this.courseID + '; gradeItemID: ' + this.gradeItemID + '; allowExceed: ' + this.allowExceed);
    this.orgService.updateGradingPage(this.courseID, this.gradeItemID);
    this.searching = false;
  }

  onSearchInput() {
    this.searching = true;
    this.orgService.filterItems(this.searchTerm);
  }

  ngOnInit() {
    this.gradingUsers = this.orgService.gradingUsersFiltered;
    this.orgService.gradingUsersFilteredSubject.asObservable().subscribe(() => {
      this.gradingUsers = this.orgService.gradingUsersFiltered;
      this.searching = false;
    });
  }

  async doRefresh(event) {
    console.log('Begin async operation');
    this.searchTerm = '';
    await this.orgService.updateGradingPage(this.courseID, this.gradeItemID);
    event.target.complete();
  }

  async gradeChangePrompt(WLUID: string) {
    const user = this.gradingUsers.find(x => x.WLUID === WLUID);
    const alert = await this.alertController.create({
      header: user.Name,
      message: user.WLUID + ' Current Mark: <strong>' + user.currGrade + '</strong>',
      cssClass: 'myNormalPrompt',
      inputs: [
        {
          name: 'newGrade',
          type: 'number',
          placeholder: 'Out of ' + this.maxGrade + ((this.allowExceed) ? ', allow exceeding.' : ''),
          min: 0,
          max: this.maxGrade
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Submit',
          handler: (data) => {
            // TODO: Call function to check if there's mergge conflict&update server with new mark.
            console.log('Confirm Ok. New Grade: ' + data.newGrade);
            if (this.orgService.validateGradeInput(data.newGrade, this.maxGrade, this.allowExceed)) {
              console.log('Grade passed validation. Attempting to update the mark server-side.');
              // TODO: try updating the mark to the server.
            } else {
              this.gradeFailedChangePrompt(WLUID);
            }
          }
        }
      ]
    });
    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
  }

  async gradeFailedChangePrompt(WLUID: string) {
    const user = this.gradingUsers.find(x => x.WLUID === WLUID);
    const alert = await this.alertController.create({
      header: user.Name,
      subHeader: 'The value entered is not valid. Please re-enter. \n' ,
      message: user.WLUID + '\n Current Mark: <strong>' + user.currGrade + '</strong>',
      cssClass: 'myAlertPrompt',
      inputs: [
        {
          name: 'newGrade',
          type: 'number',
          placeholder: 'Out of ' + this.maxGrade + ((this.allowExceed) ? ', allow exceeding.' : ''),
          min: 0,
          max: this.maxGrade
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Submit',
          handler: (data) => {
            // TODO: Call function to check if there's mergge conflict&update server with new mark.
            console.log('Confirm Ok. New Grade: ' + data.newGrade);
            if (this.orgService.validateGradeInput(data.newGrade, this.maxGrade, this.allowExceed)) {
              console.log('Grade passed validation. Attempting to update the mark server-side.');
              // TODO: try updating the mark to the server.
            } else {
              this.gradeFailedChangePrompt(WLUID);
            }
          }
        }
      ]
    });
    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
  }
}
