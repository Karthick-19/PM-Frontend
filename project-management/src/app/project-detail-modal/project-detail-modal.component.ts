import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../project';
import { ProjectServiceService } from '../project-service.service';
import { Task } from '../tasks';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../task.service';


@Component({
  standalone:true,
  imports:[MatCardModule,MatIconModule,MatToolbarModule,MatProgressBarModule,CommonModule],
  selector: 'app-project-detail-modal',
  templateUrl: './project-detail-modal.component.html',
  styleUrls: ['./project-detail-modal.component.css']
})
export class ProjectDetailModalComponent implements OnInit {
  project!: Project;
  tasks: Task[]= [];

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
    private projectService: ProjectServiceService,
    private router: Router,
    private taskService:TaskService,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.getProjectDetails(this.data.projectId);
    
  }

  getProjectDetails(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe(data => {
      this.project = data;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  closeModal(): void {
    this.dialogRef.close();  // Close the modal
  }

  openCreateTaskModal(): void {
    const dialogRef = this.dialog.open(CreateTaskModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the new task data here
        console.log('Task Created:', result);
      }
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        // Remove the task from the UI after successful deletion
        this.tasks = this.tasks.filter((task: { id: number; }) => task.id !== taskId);
        console.log('Task deleted successfully');
      },
      (      error: any) => {
        console.error('Error deleting task', error);
      }
    );}

    onDeleteProject(): void {
      const confirmed = confirm('Are you sure you want to delete this project?');
      if (confirmed) {
        this.projectService.deleteProject(this.project.id).subscribe(() => {
          alert('Project deleted successfully');
          this.router.navigate(['/projects']); // Navigate to the project list or any other appropriate route
        }, error => {
          console.error('Error deleting project', error);
        });
      }
    }
  // openTaskCreate() {
  //   this.router.navigate(['/task-create']);
  // }
  } 


