import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class MyserviceService {
  URL_BASE = environment.API_URL_MS_USER|| "http://localhost:8080/"
  //URL_BASE = 'http://127.0.0.1:8081/';
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public role!: string;
  dataRespons:any;
  constructor(private router: Router, private httpClient: HttpClient) { }


  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.role = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('roleUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }

  signIn(user: any, uname: string, pwd: string):Boolean {
    let validUser: Boolean = false;

    if (user != null && uname == user[0] && pwd == user[1]) {
        validUser = true;
        this.loggedUser = user[0];
        this.isloggedIn = true;
        this.role = user[4];
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));

        const parts = this.role.split('.');
        const latestPart = parts[parts.length - 1];
        console.log('role get source',latestPart);
        
        localStorage.setItem('roleUser', latestPart);
        
      }
      
    return validUser;
  }

  isAdmin(): Boolean {

    if (!this.role){ //this.roles== undefiened
      return false;
    }else{
      const parts = this.role.split('.');
      const latestPart = parts[parts.length - 1];
      return latestPart=='Admin';
    }
  }

  isCollaborateur(): Boolean {
    
    if (!this.role){ //this.roles== undefiened
      return false;
    }else{
      const parts = this.role.split('.');
      const latestPart = parts[parts.length - 1];
      return latestPart=='Collaborateur';
    }
  }

  isManager(): Boolean {
    
    if (!this.role){ //this.roles== undefiened
      return false;
    }else{
      const parts = this.role.split('.');
      const latestPart = parts[parts.length - 1];
      return latestPart=='Manager';
    }
  }

  public getRole(): string {
    
    if (!this.role){ //this.roles== undefiened
      return "";
    }else{
      const parts = this.role.split('.');
      const latestPart = parts[parts.length - 1];
      //console.log(latestPart);
      
      return latestPart;
    }
  }

  checkLogin(codeCollab: string, motPasse: string): Observable<any> {
    const url = `${this.URL_BASE}collaborateur/getByCodeAndMotPass`;
    let params = new HttpParams();
    params = params.append('codeCollab', codeCollab);
    params = params.append('motPasse', motPasse);
    return this.httpClient.post(url, null, { params });
  }

}
