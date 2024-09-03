import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SecurityService } from '../security.service';
import { UserRegister } from '../UserRegister';
import { NgIf } from '@angular/common';
 
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 
  constructor(private securityService: SecurityService, private router: Router){};
 
  user: UserRegister = new UserRegister(0,"","","");
 
  get userId(): string | number {
    return this.user.id === 0 ? '' : this.user.id;
  }
 
  set userId(value: string | number) {
    this.user.id = value === '' ? 0 : +value;
  }
 
 
  onSubmit(): void{
    console.log(this.user);
    this.securityService.register(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error(error);
        alert("Username or ID already exists.");
      },
      complete: () => {console.log("Registration ended.")}
    });
  }
   
}