import { Component, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { ProjectServiceService } from '../project-service.service';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task,TaskStatus } from '../tasks';
import { FilterStatusPipe } from '../filter-status.pipe';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskModalComponent } from '../update-task-modal/update-task-modal.component';




@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [FormsModule,CommonModule,FilterStatusPipe,UpdateTaskModalComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  project: any;
  projectId!: number;
  tasks: any[] = [];
  taskStatus = TaskStatus; 

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectServiceService,
    private taskService: TaskService,
    private dialog:MatDialog,
    private router: Router
  ) {}

  goBack(): void {
    this.router.navigate(['/projects']); // Adjust the route as necessary
  }

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
  // ngOnInit(): void {
  //   // Subscribe to route params and get project details
  //   this.route.paramMap.subscribe(params => {
  //     const projectId = +params.get('id')!;
  //     this.getProjectDetails(projectId);
  //   });
  // }

  openUpdateTaskModal(task: any): void {
    const dialogRef = this.dialog.open(UpdateTaskModalComponent, {
      data: { task }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProjectDetails(this.project.id); // Refresh tasks if update was successful
      }
    });
  }
  transform(tasks: Task[], status: string): Task[] {
    return tasks.filter(task => task.status === status);
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.projectService.getProjectById(projectId).subscribe(data => {
        this.project = data;
      });
    });
  }

  getProjectDetails(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe(data => {
      this.project = data;
    });
    this.taskService.getTasksByProject(projectId).subscribe(data => this.tasks = data);
  }
}
