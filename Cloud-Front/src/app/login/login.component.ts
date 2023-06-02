import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Users } from '../models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {


  msg = '';
  constructor(private service: MyserviceService, private routes: Router, public authService: AuthService) { }
  //user: any;
  user: Object[] = [];
  userNew = new Users();

  check(uname: string, p: string) {

    this.userNew.username = uname;
    this.userNew.password = p;
    this.onLoggedin();

    /*this.service.checkLogin(uname, p).subscribe(usr => {

      let roleUser!: any;
      let loggedUser: any;

      this.user = usr;
      let isValidUser: Boolean = this.service.signIn(this.user, uname, p);

      roleUser = localStorage.getItem('roleUser');
      loggedUser = localStorage.getItem('loggedUser');

      if (isValidUser && roleUser && loggedUser) {
        if (roleUser == 'Manager')
          this.routes.navigate(['/starter-manager']);
        else if (roleUser == 'Collaborateur')
          this.routes.navigate(['/starter-collaborateur']);
        else
          this.routes.navigate(['/starter']);
      } else {
        this.msg = 'Invalid Username or Password';
      }

    }); */

  }

  onLoggedin() {
    this.authService.login(this.userNew).subscribe((data) => {
      let jwToken = data.headers.get('Authorization')!;
      localStorage.setItem('loggedUser', this.userNew.username);
      this.authService.saveToken(jwToken);

      if(this.authService.isAdmin()){
        localStorage.setItem('roleUser','Admin');
        this.routes.navigate(['/starter']);
      }else if(this.authService.isManager()){
        localStorage.setItem('roleUser','Manager');
        this.routes.navigate(['/starter-manager']);
      }else if(this.authService.isCollaborateur()){
        localStorage.setItem('roleUser','Collaborateur');
        this.routes.navigate(['/starter-collaborateur']);
      }
      
    }, (erreur) => {
      //this.err = 1;
      this.msg = 'Invalid Username or Password';
    });
  }

  ngOnInit() { }
}
