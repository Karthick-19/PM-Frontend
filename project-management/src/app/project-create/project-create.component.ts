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
          this.projectService.addProject(response); // Update the project list in the service
          this.isProjectCreated = true;
          form.resetForm();  // Reset the form after successful creation
          setTimeout(() => this.isProjectCreated = false, 3000); // Hide the popup after 3 seconds
          this.router.navigate(['/projects']);  // Navigate to the project list
        },
        error => {
          console.error('Error creating project', error);
        }
      );
    }
}
