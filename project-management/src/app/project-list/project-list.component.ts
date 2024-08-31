import { Component } from '@angular/core';
import { Project } from '../project';
import { ProjectServiceService } from '../project-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectDetailModalComponent } from '../project-detail-modal/project-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule,FormsModule,ProjectCreateComponent,MatButtonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

  projects: Project[] = [];
  inputProjectId!: number;
  isModalOpen=false;

  constructor(private projectService: ProjectServiceService,private router: Router,public dialog: MatDialog
    ,private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(data => {
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
  viewProjectDetails(projectId: any): void {
    console.log('Project ID:', projectId); 
    this.router.navigate(['/projects', projectId]);
    const dialogRef = this.dialog.open(ProjectDetailModalComponent, {
      width:'1000px',
      height: '80vh',
      data: { projectId: projectId },
      panelClass: 'custom-dialog-container'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  
  

}
