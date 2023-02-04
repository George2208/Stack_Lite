import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host = environment.apiUrl;

  constructor(private http: HttpClient) { }


  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.host}/data`);
  }

 
}