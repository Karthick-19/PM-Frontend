import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SecurityService } from '../security.service';
import { UserRegister } from '../UserRegister';
import { Mail } from '../Mail';
import { MailService } from '../mail.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mailbox',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule],
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css'
})
export class MailBoxComponent {

  constructor(private securityService: SecurityService, private mailService: MailService){};

  //securityService: SecurityService = inject(SecurityService);

  // currentUser: UserRegister = new UserRegister(0,"","","");

  // displayUser(){
  //   console.log(this.securityService.currentUser);
  //   this.currentUser = this.securityService.currentUser;
  // }

  newMail: Mail = new Mail("","","");


  onSubmitMail(){
    this.mailService.sendMail(this.newMail).subscribe({
      next: () => {console.log("next function executed");},
      error: (error: any) => {console.error(error)},
      complete: () => {console.log("mail send function ended.")}
    });
  }

  signOut(){
    this.securityService.signOut();
  }
}
