import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
    public host = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public addQuestion(data: any) {
      return this.http.post<any>(`${this.host}/createQuestion`, data);
    }

}