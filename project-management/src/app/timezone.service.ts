import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  private apiUrl = 'https://www.timeapi.io/api/timezone/availabletimezones';

  constructor(private http: HttpClient) { }

  getTimezones() {
    return this.http.get<string[]>(this.apiUrl);
  }
  private conversionUrl = 'https://www.timeapi.io/api/conversion/converttimezone'
  convertTimezone(fromTimeZone: string, dateTime: string, toTimeZone: string): Observable<any> {

    const conversionData = {
      fromTimeZone,
      dateTime,
      toTimeZone,
      dstAmbiguity: ''
    };

    return this.http.post<any>(this.conversionUrl, conversionData);
  }
}
