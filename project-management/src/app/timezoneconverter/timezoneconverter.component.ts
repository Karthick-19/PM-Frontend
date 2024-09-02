import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { TimezoneService } from '../timezone.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-timezoneconverter',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatOptionModule
  ],
  templateUrl: './timezoneconverter.component.html',
  styleUrls: ['./timezoneconverter.component.css']
})
export class TimezoneconverterComponent implements OnInit {
  timezones: string[] = [];
  selectedDate: Date | null = null; // Ensure this is a Date object
  fromLocation: string = "Asia/Kolkata";
  toLocation: string = "Asia/Kolkata";
  convertedTime: string = '';

  constructor(private timezoneService: TimezoneService) {}

  ngOnInit(): void {
    this.timezoneService.getTimezones().subscribe(
      (data: string[]) => {
        this.timezones = data;
      },
      (error) => {
        console.error('Error fetching timezones', error);
      }
    );
  }

  convertTime(): void {
    if (!this.selectedDate) {
      console.error('Selected date is invalid.');
      return;
    }

    // Ensure selectedDate is a Date object and format it
    const dateObject = new Date(this.selectedDate);
    const formattedDateTime = this.formatDateTime(dateObject);

    this.timezoneService.convertTimezone(this.fromLocation, formattedDateTime, this.toLocation)
      .subscribe(
        (result: any) => {
          const conversionResult = result.conversionResult;
          // Create a Date object from the API response
          const convertedDate = new Date(conversionResult.dateTime);
          console.log(convertedDate);
          console.log(result);
          this.convertedTime = this.formatDate(convertedDate);
        },
        (error: any) => {
          console.error('Error converting timezone', error);
        }
      );
  }

  private formatDateTime(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid Date object');
    }

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero
    const hours = ('0' + date.getHours()).slice(-2); // Add leading zero
    const minutes = ('0' + date.getMinutes()).slice(-2); // Add leading zero
    const seconds = ('0' + date.getSeconds()).slice(-2); // Add leading zero

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private formatDate(date: Date): string {
    // Format Date object to a more readable format if needed
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero
    const hours = ('0' + date.getHours()).slice(-2); // Add leading zero
    const minutes = ('0' + date.getMinutes()).slice(-2); // Add leading zero
    const seconds = ('0' + date.getSeconds()).slice(-2); // Add leading zero

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
