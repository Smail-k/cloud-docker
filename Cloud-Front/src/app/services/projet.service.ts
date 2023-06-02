import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../models/projet';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  //URL_BASE = 'http://127.0.0.1:8082/';
  URL_BASE = environment.API_URL_MS_METIER|| "http://localhost:8082/"
  JWT_TOKEN = localStorage.getItem('jwt');
  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  listeProjet(): Observable<Projet[]>{

    let jwt = this.JWT_TOKEN;
    jwt = "Bearer "+jwt;
    //console.log(jwt);
    const jwtFinal = jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwtFinal})
    const url = `${this.URL_BASE}projet/all`;
    return this.httpClient.get<any>(url,{headers:httpHeaders});


    // const httpOptions = {
    //   withCredentials: false
    //  };

    //  const url = `${this.URL_BASE}projet/all`;
     
    // return this.httpClient.get<any>(url, httpOptions); 
    
  }

  getNbProjet(): Observable<number>{

    let jwt = this.JWT_TOKEN;
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.URL_BASE}projet/count`;
    return this.httpClient.get<any>(url,{headers:httpHeaders});

    // const httpOptions = {
    //   withCredentials: false
    //  };

    //  const url = `${this.URL_BASE}projet/count`;
     
    // return this.httpClient.get<any>(url, httpOptions); 
    
  }

  saveProject(data:any
    ): Observable<any> {

      const url = `${this.URL_BASE}projet/new`;
      let jwt = this.JWT_TOKEN;
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});
      return this.httpClient.post<any>(url, data, {headers:httpHeaders}); 
    }
  

    deleteProject(id: number): Observable<any> {
   
         let jwt = this.JWT_TOKEN;
         jwt = "Bearer "+jwt;
         let httpHeaders = new HttpHeaders({"Authorization":jwt});
         const url = `${this.URL_BASE}projet/delete/${id}`;
        return this.httpClient.delete(url,{headers:httpHeaders});
      }


}
