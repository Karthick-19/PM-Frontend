import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SecurityService } from '../security.service';
import { UserRegister } from '../UserRegister';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, NgIf, NgFor],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  
  timezones: string[] = [];

  constructor(private securityService: SecurityService, private router: Router, private http: HttpClient){};

  user: UserRegister = new UserRegister(0,"","","","","");

  ngOnInit(): void {
    this.http.get<string[]>('https://timeapi.io/api/timezone/availabletimezones')
      .subscribe(data => {
        this.timezones = data;
      });
      console.log(this.timezones);
    }

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
