import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SecurityService } from '../security.service';
import { UserLogin } from '../UserLogin';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  constructor(private securityService: SecurityService){};
 
  user: UserLogin = new UserLogin("","");
 
  router = inject(Router);
 
  jwt: string = "";
 
  onSubmit(): void{
    console.log(this.user);
    this.securityService.login(this.user).subscribe({
      next: (data) => {
        console.log(data);
        localStorage.setItem('token', data);
        this.securityService.jwt = data;
 
        // Fetch user details using the email ID
        this.securityService.getLoggedinUser2(this.user).subscribe({
          next: (userData) => {
            console.log('User Data:', userData); // Log the user data to the console
            localStorage.setItem('userId', userData.id.toString());
          },
          error: (error) => {
            console.error('Error fetching user details:', error);
          }
        }); 
        this.router.navigate(['/projects']);
      },
      error: (error: any) => {
        console.error(error);
        alert("Username or password doesn't match. New member ? Feel free to register.")
      },
      complete: () => {console.log("Login ended.")}
    });
  }
 
}