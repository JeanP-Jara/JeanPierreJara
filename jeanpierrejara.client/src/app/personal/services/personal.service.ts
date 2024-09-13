import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personal } from '../interface/personal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  urlBase = "https://localhost:7212";

  constructor(public _http: HttpClient) { }

  ListarPersonal(): Observable<Personal[]> {
    return this._http.get<Personal[]>(this.urlBase+'/api/personal');
  }

  ObtenerPersonal(idPersonal: number): Observable<Personal> {
    return this._http.get<Personal>(this.urlBase+'/api/personal/'+idPersonal);
  }

  CrearPersonal(personal: Personal): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
  });
    return this._http.post<any>(this.urlBase+'/api/personal', personal, {headers: reqHeader} );
  }

  EditarPersonal(personal: Personal): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    return this._http.put<any>(this.urlBase+'/api/personal', personal, {headers: reqHeader} );
  }

  EliminarPersonal(idPersonal: number): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    return this._http.delete<any>(this.urlBase+'/api/personal/'+idPersonal,  {headers: reqHeader} );
  }


}
