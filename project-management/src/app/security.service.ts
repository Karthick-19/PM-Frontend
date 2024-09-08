import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegister } from './UserRegister';
import { UserLogin } from './UserLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient, private router: Router) { }

  private url = 'http://localhost:7050';

  userdata!:string

  jwt: string = "";

  currentUser: UserRegister = new UserRegister(0,"","","","","");

  register(newUser: UserRegister): Observable<UserRegister>{
    return this.http.post<UserRegister>(`${this.url}/register`, newUser);
  }

  login(newUser: UserLogin): Observable<string>{
    return this.http.post(`${this.url}/login`, newUser, { responseType: 'text' });
  }

  getLoggedinUser(newUser: UserLogin): Observable<UserRegister>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.jwt}`);
    return this.http.get<UserRegister>(`${this.url}/userdetails/${newUser.username}`, {headers});
  }


  getLoggedinUser2(newUser: UserLogin): Observable<UserRegister>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.jwt}`);
    return this.http.get<UserRegister>(`${this.url}/userdetails/${newUser.username}`, {headers});
  }

  private getJwt(): string | null {
    return localStorage.getItem('token');
  }

  // getLoggedinUser2(): Observable<UserRegister> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getJwt()}`);
  //   return this.http.get<UserRegister>(`${this.url}/userdetailsid/${newUser}`, { headers });
  // }
  // getLoggedinUser(): Observable<UserRegister> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwt}`);
  //   return this.http.get<UserRegister>(`${this.url}/userdetails/`, { headers });
  // }

  signOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  private apiUrl = "http://localhost:7050"
  getUsersByOrganization(organization: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/organization/${organization}`);
  }



}
