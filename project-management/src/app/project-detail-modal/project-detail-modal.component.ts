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


@Component({
  standalone:true,
  imports:[MatCardModule,MatIconModule,MatToolbarModule,MatProgressBarModule,CommonModule],
  selector: 'app-project-detail-modal',
  templateUrl: './project-detail-modal.component.html',
  styleUrls: ['./project-detail-modal.component.css']
})
export class ProjectDetailModalComponent implements OnInit {
  project!: Project;

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
    private projectService: ProjectServiceService,
    // private router: Router,
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

  // openTaskCreate() {
  //   this.router.navigate(['/task-create']);
  // }
}
