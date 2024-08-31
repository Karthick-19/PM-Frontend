import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  private apiUrl = 'https://www.timeapi.io/api/timezone/availabletimezones';

  constructor(private http: HttpClient) {}

  getTimezones() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
