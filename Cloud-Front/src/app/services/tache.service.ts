import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../models/projet';
import { Observable } from 'rxjs';
import { Tache } from '../models/tache';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  //URL_BASE = 'http://127.0.0.1:8082/';
  URL_BASE = environment.API_URL_MS_METIER|| "http://localhost:8082/"
  JWT_TOKEN = localStorage.getItem('jwt');
  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  getTaches(param:any):Observable<any[]>{ 

    const url = `${this.URL_BASE}tache/projet/${param}`;
    let jwt = this.JWT_TOKEN;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});

    return this.httpClient.get<any>(url, {headers:httpHeaders}); 
  }

  getTachesRealise(param:any):Observable<any[]>{ 
 
     const url = `${this.URL_BASE}tache/tache-rea-projet/${param}`;
     let jwt = this.JWT_TOKEN;
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.httpClient.get<any>(url, {headers:httpHeaders}); 
  
  }

  getTachesRealiseCollab(codeProjet: any, codeCollab: any): Observable<any[]> {
    
    let params = new HttpParams();
    params = params.append('codeProjet', codeProjet);
    params = params.append('codeCollab', codeCollab);

    const url = `${this.URL_BASE}tache/tache-rea`;
    let jwt = this.JWT_TOKEN;
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.httpClient.get<any[]>(url, { params:params, headers:httpHeaders });
  }

 

  saveTache(data:any): Observable<any> {
      const url = `${this.URL_BASE}tache/new-save`;
  
      let params = new HttpParams();
      params = params.append('codeProjet', data.codeProjet);
      params = params.append('intituleTache', data.intituleTache);
      params = params.append('chargeHoraireTache', data.chargeHoraireTache);
      let jwt = this.JWT_TOKEN;
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})

      return this.httpClient.post(url, null, { params:params,headers:httpHeaders });
  }

  updateTache(data:any): Observable<any> {
    const url = `${this.URL_BASE}tache/update-new`;

    let params = new HttpParams();
    params = params.append('codeTache', data.codeTache);
    params = params.append('codeProjet', data.codeProjet);
    params = params.append('intituleTache', data.intituleTache);
    params = params.append('chargeHoraireTache', data.chargeHoraireTache);
    
    let jwt = this.JWT_TOKEN;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});

    return this.httpClient.post(url, null, { params:params,headers:httpHeaders });
  }


  getNbTaskDone(status: string): Observable<number> {

    let jwt = this.JWT_TOKEN;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.URL_BASE}tacherealisee/count`;
    let params = new HttpParams();
    params = params.append('status', status.toString());

    return this.httpClient.get<any>(url,{params:params,headers:httpHeaders});
  }

  countTaskCollab(codeCollab: any, status:any): Observable<any> {

    let params = new HttpParams();
    params = params.append('codeCollab', codeCollab);
    params = params.append('status', status);
    
    const url = `${this.URL_BASE}tacherealisee/countTask`;
    let jwt = this.JWT_TOKEN;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})

    return this.httpClient.get<any>(url, { params:params,headers:httpHeaders });
  }


    deleteTache(id: number): Observable<any> {
      const url = `${this.URL_BASE}tache/delete/${id}`;
      let jwt = this.JWT_TOKEN;
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});
      return this.httpClient.delete(url,{headers:httpHeaders});
    }


    deleteTaskPk(data:any
      ): Observable<any> {
        const url = `${this.URL_BASE}tacherealisee/delete-pk`;
    
        let params = new HttpParams();
        params = params.append('codeTache', data.codeTache);
        params = params.append('codeCollab', data.codeCollab);
       
        let jwt = this.JWT_TOKEN;
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt});
        
        return this.httpClient.delete(url, { params:params,headers:httpHeaders });
      }

}
