// projects-created.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectServiceService } from '../../project-service.service'; 
import { Project } from '../../project';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  imports:[CommonModule,FormsModule],
  selector: 'app-projects-created',
  templateUrl: './projects-created.component.html',
  styleUrls: ['./projects-created.component.css']
})
export class ProjectsCreatedComponent implements OnInit {
  createdProjects: Project[] = [];

  constructor(private projectService: ProjectServiceService, private router: Router) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.projectService.getProjectsByUserId(userId).subscribe(
        (projects: Project[]) => {
          this.createdProjects = projects;
        },
        (error) => {
          console.error('Error fetching projects', error);
        }
      );
    }
  }

  navigateToProject(projectId: number): void {
    this.router.navigate(['/projects', projectId]);
  }
}
