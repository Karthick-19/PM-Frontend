import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProjectListComponent,ProjectCreateComponent,CommonModule,MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-management';

  isModalOpen = false;

  constructor(private router: Router) {}

  openCreateProject(): void {
    this.isModalOpen = true;
    // this.router.navigate([{ outlets: { modal: ['projects/create'] } }]);
  }

  closeCreateProject(): void {
    this.isModalOpen = false;
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
