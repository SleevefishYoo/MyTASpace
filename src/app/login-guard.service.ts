import { Injectable } from '@angular/core';
import { BrightspaceService } from './brightspace.service';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private bService: BrightspaceService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return !this.bService.authenticated;
  }
}
