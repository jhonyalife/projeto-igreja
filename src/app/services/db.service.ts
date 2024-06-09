import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environments';
import { Eventos } from '../models/Eventos';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private _http: HttpClient) { }

  getDados(): Observable<Eventos[]> {
    return this._http.get(environment.db).pipe(
      map((response: any) => {
        return Object.values(response)
      })
    );
  }

}
