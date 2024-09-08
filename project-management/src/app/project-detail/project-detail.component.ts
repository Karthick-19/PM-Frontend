import { Component, Pipe } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { ProjectServiceService } from '../project-service.service';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task,TaskStatus } from '../tasks';
import { FilterStatusPipe } from '../filter-status.pipe';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskModalComponent } from '../update-task-modal/update-task-modal.component';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { TimezoneconverterComponent } from '../timezoneconverter/timezoneconverter.component';




@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [FormsModule,CommonModule,FilterStatusPipe,UpdateTaskModalComponent,RouterLink,MatIconModule],
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
    this.router.navigate(['/projects']); 
  }

  openCreateTaskModal(): void {
    const dialogRef = this.dialog.open(CreateTaskModalComponent, {
      data: { projectId: this.project.id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the newly created task to the tasks array
        this.tasks.push(result);
        console.log('Task list updated with new task');
        this.getProjectDetails(this.project.id)
      }
    });
  }
  closeModal(): void {
    const dialogRef = this.dialog.open(CreateTaskModalComponent);

  }
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

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter((task: { id: number; }) => task.id !== taskId);
        console.log('Task deleted successfully');
        this.getProjectDetails(this.project.id);
      },
      (      error: any) => {
        console.error('Error deleting task', error);
      }
    );
  }

    onDeleteProject(): void {
      const confirmed = confirm('Are you sure you want to delete this project?');
      if (confirmed) {
        this.projectService.deleteProject(this.project.id).subscribe(() => {
          // alert('Project deleted successfully');
          this.router.navigate(['/projects']); // Navigate to the project list or any other appropriate route
        }, error => {
          console.error('Error deleting project', error);
        });
      }
    }
    openTimeZoneConverter(): void {
      this.dialog.open(TimezoneconverterComponent, {
        width: '500px',
        height: '70vh'
      });
    }
}
