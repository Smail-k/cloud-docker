import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Users } from '../models/users';
import { environment } from 'src/environments/environment.prod';
@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
  /*  users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
                     {"username":"nadhem","password":"123","roles":['USER']} ]; */
  
   private helper = new JwtHelperService();

   apiURL = environment.API_URL_MS_USER|| "http://localhost:8080/"

  //apiURL: string = 'http://localhost:8080/';
  token!:string;
  
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];
  
    constructor(private router : Router,
                private http : HttpClient
  ) { }
  
    login(user : Users)
    {
    return this.http.post<Users>(this.apiURL+'/login', user , {observe:'response'});
    }
   
   saveToken(jwt:string){
        localStorage.setItem('jwt',jwt);
        this.token = jwt;
        this.isloggedIn = true; 
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
        this.decodeJWT();
    }
  
    getToken():string {
      return this.token;
    }
  
    decodeJWT()
    {   if (this.token == undefined)
              return;
      const decodedToken = this.helper.decodeToken(this.token);
      this.roles = decodedToken.roles;
      this.loggedUser = decodedToken.sub;
    }
  
   
  
  
   /* SignIn(user: User): Boolean {
      let validUser: Boolean = false;
      this.users.forEach((curUser) => {
        if (user.username == curUser.username && user.password == curUser.password) {
          validUser = true;
          this.loggedUser = curUser.username;
          this.isloggedIn = true;
          this.roles = curUser.roles;
          localStorage.setItem('loggedUser', this.loggedUser);
          localStorage.setItem('isloggedIn', String(this.isloggedIn));
        }
      });
      return validUser;
    }*/
  
    isAdmin():Boolean{
      if (!this.roles) //this.roles== undefiened
      return false;
      return (this.roles.indexOf('Admin') >=0) ;
      ;
    }  
  
    isManager():Boolean{
        if (!this.roles) //this.roles== undefiened
        return false;
        return (this.roles.indexOf('Manager') >=0) ;
        ;
      }  
      isCollaborateur():Boolean{
        if (!this.roles) //this.roles== undefiened
        return false;
        return (this.roles.indexOf('Collaborateur') >=0) ;
        ;
      }  
    logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('roleUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
    }
  
    setLoggedUserFromLocalStorage(login: string) {
      this.loggedUser = login;
      this.isloggedIn = true;
     // this.getUserRoles(login);
    }
  
    loadToken() {
      this.token = localStorage.getItem('jwt')!;
      this.decodeJWT();
    }
  
    isTokenExpired(): Boolean
    {
      return  this.helper.isTokenExpired(this.token);   
    }
  
  
  
    /*getUserRoles(username: string) {
      this.users.forEach((curUser) => {
        if (curUser.username == username) {
          this.roles = curUser.roles;
        }
      });
    }*/
      
  }