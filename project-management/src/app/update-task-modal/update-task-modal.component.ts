import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ATask } from '../ATask';


@Component({
  standalone:true,
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.css'],
  imports:[FormsModule,CommonModule,MatInputModule,MatFormFieldModule,MatSelectModule,MatDialogModule]
})
export class UpdateTaskModalComponent {
  task: ATask;
  taskStatuses = ['TODO', 'ONGOING', 'TESTING', 'COMPLETED'];
  progressOptions = [0, 25, 50, 75, 100];

  @Output() taskUpdated = new EventEmitter<void>();


  constructor(
    private dialogRef: MatDialogRef<UpdateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService
  ) {
    this.task = { ...data.task }; // Copy task data for local editing
  }

  onUpdate(): void {
    this.taskService.updateTaskStatus(this.task.taskId, this.task.status).subscribe(() => {
      this.taskService.updateTaskProgress(this.task.taskId, this.task.progress).subscribe(() => {
        this.taskUpdated.emit(); // Emit event
        this.dialogRef.close(); // Close the modal
      });
    });
  }
}
