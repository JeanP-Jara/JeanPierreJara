import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hijo } from '../interface/hijo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HijoService {

  urlBase = "https://localhost:7212";

  constructor(public _http: HttpClient) { }

  ListarHijo(): Observable<Hijo[]> {
    return this._http.get<Hijo[]>(this.urlBase+'/api/hijo');
  }

  ObtenerHijo(idPersonal: number): Observable<Hijo[]> {
    return this._http.get<Hijo[]>(this.urlBase+'/api/hijo/'+idPersonal);
  }

  CrearHijo(hijo: Hijo): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
  });
    return this._http.post<any>(this.urlBase+'/api/hijo', hijo, {headers: reqHeader} );
  }

  EditarHijo(hijo: Hijo): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    return this._http.put<any>(this.urlBase+'/api/hijo', hijo, {headers: reqHeader} );
  }

  EliminarHijo(idHijo: number): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    return this._http.delete<any>(this.urlBase+'/api/hijo/'+idHijo,  {headers: reqHeader} );
  }
}
