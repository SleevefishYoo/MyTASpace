import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.page.html',
  styleUrls: ['./grading.page.scss'],
})
export class GradingPage implements OnInit {
  searching: boolean = true;
  gradingUsers: Array<{ Name; WLUID: string; WLUEmail: string; gradeOutOf: string; currGrade: string }> = [];
  searchTerm: any;


  constructor(private orgService: OrganizationService) {
    this.orgService.updateGradingPage(orgService.CP213L06Grades);
    this.gradingUsers = orgService.gradingUsersFiltered;
    
    this.searching = false;
  }

  onSearchInput() {
    this.searching = true;
    this.orgService.filterItems(this.searchTerm);
  }

  ngOnInit() {this.orgService.gradingUsersFilteredSubject.asObservable().subscribe(() => {
    this.gradingUsers = this.orgService.gradingUsersFiltered;
    this.searching = false;
  });
  }

}
