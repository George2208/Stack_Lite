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

  public getQuestions(): Observable<any> {
    return this.http.get<any>(`${this.host}/questions`);
  }

  public getUsers(): Observable<any> {
    return this.http.get<any>(`${this.host}/users`);
  }

  public register(user: any): Observable<any> {
    return this.http.post<any>(`${this.host}/register`, user);
  }

  public login(user: any): Observable<any> {
    return this.http.post<any>(`${this.host}/login`, user);
  }

  public addUserToLocalCache(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): any {
    return JSON.parse(localStorage.getItem('user')|| '{}');
  }

  public logout(): void {
    localStorage.removeItem('user');
  }

 
}