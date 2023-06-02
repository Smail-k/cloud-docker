import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../models/projet';
import { Observable } from 'rxjs';
import { Manager } from '../models/manager';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {

  //URL_BASE = 'http://127.0.0.1:8082/';
  URL_BASE = environment.API_URL_MS_METIER|| "http://localhost:8082/"
  JWT_TOKEN = localStorage.getItem('jwt');

  constructor(private httpClient: HttpClient, private authService:AuthService) { }


  listeOnlyCollaborateurs(): Observable<Manager[]>{

     const url = `${this.URL_BASE}collaborateur/only`;
     let jwt = this.JWT_TOKEN;
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt})
     
    return this.httpClient.get<any>(url, {headers:httpHeaders}); 
    
  }


  listeOnlyManagers(): Observable<Manager[]>{

     const url = `${this.URL_BASE}collaborateur/only-manager`;

     let jwt = this.JWT_TOKEN;
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt})
     return this.httpClient.get<any>(url,{headers:httpHeaders});
    
  }

  public affectationTache(data: any): Observable<any> { 

     const url = `${this.URL_BASE}collaborateur/affectTacheCollaborateur`;
     let jwt = this.JWT_TOKEN;
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.httpClient.post<any>(url, data, {headers:httpHeaders}); 
  }

  affectTacheCollaborateur(data:any
  ): Observable<any> {
    const url = `${this.URL_BASE}collaborateur/affectTacheCollaborateur`;

    let params = new HttpParams();
    params = params.append('codeTache', data.codeTache);
    params = params.append('codeCollab', data.codeCollab);
    params = params.append('chargeHorairePlanifiee', data.chargeHorairePlanifiee);

    let jwt = this.JWT_TOKEN;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});

    return this.httpClient.post(url, null, { params:params,headers:httpHeaders });
  }

  validerTacheCollaborateur(data:any
    ): Observable<any> {
      const url = `${this.URL_BASE}collaborateur/validerTache`;
  
      let params = new HttpParams();
      params = params.append('codeTache', data.codeTache);
      params = params.append('codeCollab', data.codeCollab);
      
      let jwt = this.JWT_TOKEN;
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});

      return this.httpClient.post(url, null, { params:params, headers:httpHeaders });
    }

    doneTaskCollaborateur(data:any
      ): Observable<any> {
        const url = `${this.URL_BASE}collaborateur/doneTask`;
    
        let params = new HttpParams();
        params = params.append('codeTache', data.codeTache);
        params = params.append('codeCollab', data.codeCollab);
        params = params.append('chargeHoraireRealisee', data.chargeHoraireRealisee);

        let jwt = this.JWT_TOKEN;
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt});

        return this.httpClient.post(url, null, { params:params,headers:httpHeaders });
      }

  saveManager(data:any
    ): Observable<any> {
      const url = `${this.URL_BASE}collaborateur/newManager`;
      let jwt = this.JWT_TOKEN;
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.httpClient.post<any>(url, data, {headers:httpHeaders}); 
  }

  deleteManager(id: string): Observable<any> {

    const url = `${this.URL_BASE}collaborateur/delete/${id}`;
    let jwt = this.JWT_TOKEN;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.httpClient.delete(url,{headers:httpHeaders});
  }

  saveCollaborateur(data:any
    ): Observable<any> {
      const url = `${this.URL_BASE}collaborateur/new`;

    let jwt = this.JWT_TOKEN;
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt})
     return this.httpClient.post<any>(url, data, {headers:httpHeaders}); 
  }

  deleteCollaborateur(id: string): Observable<any> {
    const url = `${this.URL_BASE}collaborateur/delete/${id}`;
    let jwt = this.JWT_TOKEN;
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.httpClient.delete(url,{headers:httpHeaders});
  }

  getNbCollaborateur(): Observable<number>{

    let jwt = this.JWT_TOKEN;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.URL_BASE}collaborateur/count`;
    return this.httpClient.get<any>(url,{headers:httpHeaders});

  }

}
