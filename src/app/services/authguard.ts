import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersStoreService } from 'src/app/services/users-store.service';

@Injectable()
export class AuthGuardService implements CanActivate {
constructor(
private usersStoreService: UsersStoreService,
private router: Router) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.usersStoreService.isGuest()) {
    return true;
    } else {
        alert('not a logged in user')
    this.router.navigate(['/login']);
    }
}
}