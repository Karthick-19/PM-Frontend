import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  standalone:true,
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.css'],
  imports:[FormsModule,CommonModule,MatInputModule,MatFormFieldModule,MatSelectModule,MatDialogModule]
})
export class UpdateTaskModalComponent {
  task: any;
  taskStatuses = ['TODO', 'ONGOING', 'TESTING', 'COMPLETED'];
  progressOptions = [0, 25, 50, 75, 100];

  constructor(
    private dialogRef: MatDialogRef<UpdateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService
  ) {
    this.task = { ...data.task }; // Copy task data for local editing
  }

  onUpdate(): void {
    this.taskService.updateTaskStatus(this.task.id, this.task.status).subscribe(() => {
      this.taskService.updateTaskProgress(this.task.id, this.task.progress).subscribe(() => {
        this.dialogRef.close(true); // Close the modal and return success
      });
    });
  }
}
