import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router) { }   

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.isLoggedIn()) {      
        return true;      
        }                 
      this.router.navigate(['/home']);      
     return false;      
}

  public isLoggedIn(): boolean 
  {      
    let status = false;      
    if (localStorage.getItem('isLoggedIn') == "true") {      
        status = true;      
    }         
    return status;      
   }    
}  
  

