import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProjectListComponent,
    ProjectCreateComponent,
    EditProfileComponent,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'project-management';
  isModalOpen = false;
  isSidenavOpen = false;

  constructor(private router: Router) {}

  openCreateProject(): void {
    this.isModalOpen = true;
  }

  closeCreateProject(): void {
    this.isModalOpen = false;
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  closeSidenav(): void {
    this.isSidenavOpen = false;
  }

  logout(): void {
    // Implement logout logic here
    console.log('User logged out');
    this.router.navigate(['/login']); // Adjust this route as needed
  }
}
