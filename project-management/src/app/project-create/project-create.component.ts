import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../project';
import { ProjectServiceService } from '../project-service.service';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {

  project: Project = new Project();

  constructor(private projectService: ProjectServiceService) { }

  onSubmit(): void {
    this.projectService.createProject(this.project).subscribe(response => {
      console.log('Project created successfully', response);
    }, error => {
      console.error('Error creating project', error);
    });
  }

}
