import { BloggerService } from './../blogger.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloggingGuardGuard implements CanActivate {
  constructor(private Ser: BloggerService, private Route: Router) { }

  canActivate(): boolean {
    if (!!window.localStorage.getItem('BlogGTKn')) {
      this.Ser.ValidateUser().subscribe((x: boolean) => {
        console.log(x);
        if (x === false) {
          this.Route.navigateByUrl('/Logins');
          return false;
        } else {
          console.log(` True Block : ${x}`);
          return true;
        }
      }, err => {
        console.log(err);
        this.Route.navigateByUrl('/Logins');
        return false;
      });
      return true;
    } else {
      this.Route.navigateByUrl('/Logins');
      return false;
    }
  }
}

