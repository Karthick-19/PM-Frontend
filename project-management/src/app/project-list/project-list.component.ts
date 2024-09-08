import { Component } from '@angular/core';
import { Project } from '../project';
import { ProjectServiceService } from '../project-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProjectDetailModalComponent } from '../project-detail-modal/project-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SecurityService } from '../security.service';
import { TimezoneconverterComponent } from '../timezoneconverter/timezoneconverter.component';



@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule,FormsModule,ProjectCreateComponent,MatButtonModule,MatIconModule,RouterOutlet,RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

  projects: Project[] = [];
  inputProjectId!: number;
  isModalOpen=false;
  notifications = ['Notification 1', 'Notification 2', 'Notification 3']; 
  userId:number=2000;

  constructor(private projectService: ProjectServiceService,private router: Router,public dialog: MatDialog
    ,private cdr: ChangeDetectorRef, private securityService: SecurityService
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Convert user ID to number
      const userIdNumber = Number(userId);
      
      // Fetch projects for the user ID
      this.projectService.getProjectsByUserId(userIdNumber).subscribe({
        next: (projects) => {
          this.projects = projects;
        },
        error: (error) => {
          console.error('Error fetching projects:', error);
        }
      });
      this.projectService.projects$.subscribe({
        next: (updatedProjects) => {
          this.projects = updatedProjects;
        },
        error: (error) => {
          console.error('Error updating projects list:', error);
        }
      });
      
    } else {
      console.log('No user ID found in localStorage.');
    }
  }

  loadProjectsByUserId(userId: number): void {
    this.projectService.getProjectsByUserId(userId).subscribe(data => {
      this.projects = data;
    });
    this.projectService.projects$.subscribe(projects => {
      this.projects = projects;
    });
  }
  openCreateProject(): void {
    this.isModalOpen = true;
  }

  closeCreateProject(): void {
    this.isModalOpen = false;
  }
  // viewProjectDetails(projectId: any): void {
  //   console.log('Project ID:', projectId); 
  //   // this.router.navigate(['/projects', projectId]);
  //   const dialogRef = this.dialog.open(ProjectDetailModalComponent, {
  //     width:'1000px',
  //     height: '80vh',
  //     data: { projectId: projectId },
  //     panelClass: 'custom-dialog-container'
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
  viewProjectDetails(projectId: any): void {
    this.router.navigate(['/projects', projectId]);
  }

  logOut(): void{
    this.securityService.signOut();
  }

  openTimeZoneConverter(): void {
    this.dialog.open(TimezoneconverterComponent, {
      width: '500px',
      height: '70vh'
    });
  }

}
