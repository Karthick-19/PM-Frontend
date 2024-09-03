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
 
        this.securityService.getLoggedinUser(this.user).subscribe({
          next: (data) => {this.securityService.currentUser = data},
          error: (error) => {console.error(error)}
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