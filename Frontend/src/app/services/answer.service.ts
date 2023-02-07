import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
    public host = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public getAnswers(): Observable<any> {
        return this.http.get<any>(`${this.host}/answers`);
    }

    public getAnswersByQuestionId(data: any) {
        return this.http.post<any>(`${this.host}/getAnswersByQuestionId`, data);
    }

    public addAnswer(data: any) {
      return this.http.post<any>(`${this.host}/createAnswer`, data);
    }

}