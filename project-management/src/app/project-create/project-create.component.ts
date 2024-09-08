import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Project } from '../project';
import { ProjectServiceService } from '../project-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {

  project: Project = new Project();
  isProjectCreated = false;
  createdProjects: Project[] = [];

  constructor(private projectService: ProjectServiceService,
    private router:Router
  ) { }

  afterCreateOrDelete() {
    this.router.navigateByUrl('/projects').then(() => {
      this.router.navigateByUrl('/projects'); // Refresh the route
    });}

    onSubmit(form: NgForm): void {
      this.projectService.createProject(this.project).subscribe(
        response => {
          console.log('Project created successfully', response);
          
          // Update the project list in the service
          // This ensures that the list reflects the newly created project
          this.projectService.addProject(response);
    
          // Set a flag to show success message or update UI
          this.isProjectCreated = true;
    
          // Reset the form after successful creation
          form.resetForm();
    
          // Hide the popup after 3 seconds
          setTimeout(() => this.isProjectCreated = false, 3000);
    
          // Navigate to the project list
          // this.router.navigate(['/projects']);
        },
        error => {
          console.error('Error creating project', error);
          // Optionally, display an error message to the user here
        }
      );
      // const userId = Number(localStorage.getItem('userId'));

      // this.projectService.getProjectsByUserId(userId).subscribe(projects => {
      //   this.createdProjects = projects;
      // });
    }
  }
