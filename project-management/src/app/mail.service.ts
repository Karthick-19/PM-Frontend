import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from './Mail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  jwt: string = "";

  private url = "http://localhost:7050/notify/send";

  sendMail(newMail: Mail): Observable<String>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.jwt}`);
    return this.http.post<String>(`${this.url}`, newMail, {headers});
  }


}
