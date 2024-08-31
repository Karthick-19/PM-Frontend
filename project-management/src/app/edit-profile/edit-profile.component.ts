import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TimezoneService } from '../timezone.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  timezones!: string[];

  constructor(private router: Router,private timezoneService:TimezoneService) {  this.loadUserData();}

  ngOnInit(): void {
    this.timezoneService.getTimezones().subscribe(data => {
      this.timezones = data;
    });
  }

  user = {
    name: '',
    timezone: '',
    email: ''
    // Add more fields as necessary
  };

  
  loadUserData() {
    // Load the current user's data (this is just a placeholder)
    this.user = {
      name: 'John Doe',
      timezone: 'UTC+00:00',
      email: 'john.doe@example.com'
      // Load more fields as necessary
    };
  }

  saveProfile() {
    // Logic to save the profile (e.g., send the data to a server)
    console.log('Profile saved:', this.user);
  }

  cancel() {
    // Logic to cancel the editing (e.g., revert changes or navigate away)
    console.log('Editing cancelled');
  }
}
