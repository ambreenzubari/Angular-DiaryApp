import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 

  constructor(
    private afAuth: AngularFireAuth
    ,public router:Router
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      const user = await this.afAuth.currentUser;
            debugger;
      const isAuthenticated = user ? true : false;
      if (!isAuthenticated) {
        
        alert('You must be authenticated in order to access this page');  
  
        this.router.navigateByUrl('/')
      }
      return isAuthenticated;
  

  }
}
