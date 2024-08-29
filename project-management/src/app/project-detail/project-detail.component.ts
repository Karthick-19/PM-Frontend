import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { ProjectServiceService } from '../project-service.service';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  project: any;
  projectId!: number;
  tasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectServiceService,
    private taskService: TaskService
  ) {}

  // ngOnInit(): void {
  //   this.loadProject();
  //   this.loadTasks();
  //   // this.route.paramMap.subscribe(params => {
  //   //   const projectId = +params.get('id')!;
  //   //   this.getProjectDetails(projectId);
  //   // });
  // }

  // loadProject(): void {
  //   const projectId = +this.route.snapshot.paramMap.get('id')!; // Get the project ID from the route
  //   this.projectService.getProject(projectId).subscribe(data => this.project = data);
  // }

  // loadTasks(): void {
  //   const projectId = +this.route.snapshot.paramMap.get('id')!; // Get the project ID from the route
  //   this.taskService.getTasksByProject(projectId).subscribe(data => this.tasks = data);
  // }

  // getProjectDetails(): void {
  //   this.projectService.getProject(this.projectId).subscribe(
  //     data => this.project = data,
  //     error => console.error('Error fetching project details:', error)
  //   );
  // }
  ngOnInit(): void {
    // Subscribe to route params and get project details
    this.route.paramMap.subscribe(params => {
      const projectId = +params.get('id')!;
      this.getProjectDetails(projectId);
    });
  }

  getProjectDetails(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe(data => {
      this.project = data;
    });
    this.taskService.getTasksByProject(projectId).subscribe(data => this.tasks = data);
  }
}
