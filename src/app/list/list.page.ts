import { Component, OnInit } from '@angular/core';
import { containerRefreshEnd } from '@angular/core/src/render3';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  gradeItemList = [{Name: '', gradeItemID: '' }];
  courseID = null;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private orgService: OrganizationService
    ) {
    this.courseID = Number(this.activatedRoute.snapshot.paramMap.get('courseID'));
    this.orgService.updateGradeItems(this.courseID);
    this.gradeItemList = this.orgService.gradeItemsMenuItems;
    this.orgService.gradeItemsMenuSubject.asObservable().subscribe(() => {
      this.gradeItemList = this.orgService.gradeItemsMenuItems;
    });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
