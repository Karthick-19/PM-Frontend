import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../task.service';
import { ProjectServiceService } from '../project-service.service';
import { Task } from '../tasks';
import { Project } from '../project';
import { MailService } from '../mail.service';
import { Mail } from '../Mail';
import { SecurityService } from '../security.service';



@Component({
  standalone: true,
  imports: [MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatOption,
    MatSelectModule
  ],
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css']
})
export class CreateTaskModalComponent implements OnInit{
  taskForm: FormGroup;
  projects: any[] = []; // List of projects
  project!: Project;
  progressOptions: number[] = [0, 25, 50, 75, 100];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private projectService: ProjectServiceService // Inject the ProjectService
    ,private mailService: MailService,
    private securityService: SecurityService
  ) {
    
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['TODO', Validators.required],
      progress: [0, Validators.required],
      projectId: [data.projectId, Validators.required],
      createdDate: [new Date(), Validators.required],
      deadline: [new Date(), Validators.required],
      assignedTo:[[''],Validators.required]
    });

    // Fetch projects when component initializes
    this.projectService.getProjects().subscribe((projects: any[]) => {
      this.projects = projects;
    });
  }
  users: any[] = [];
  ngOnInit(): void {
    this.loadUsers();
  }

  getProjectDetails(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe(data => {
      this.project = data;
    });
  }
  newMail: Mail = new Mail("","","");
  onSubmit(): void {
    if (this.taskForm.valid) {
      const projectId = this.taskForm.value.projectId;
      const selectedProject = this.projects.find(project => project.id === projectId);
  
      if (selectedProject) {
        const task = {
          ...this.taskForm.value,
          projectName:selectedProject.name,
          project: selectedProject
        };
        
        this.taskService.createTask(task).subscribe(
          response => {
            console.log('Task created successfully', response);
            this.dialogRef.close(response);  
            this.newMail = {
              email: task.assignedTo, 
              subject: 'Task Allocated',
              message: `
                Hello,

                A new task has been assigned to you.

                Task Details:
               
                - Name: ${task.name}
                - Description: ${task.description}
                - Status: ${task.status}
                - Progress: ${task.progress}%
                - Deadline: ${task.deadline}
                - Project: ${task.project.name}

                Please make sure to complete it before the deadline.

                Best regards,
                Project Management Team
              `
            };
            
            this.mailService.sendMail(this.newMail).subscribe(
              mailResponse => {
                console.log('Mail sent successfully', mailResponse);
                this.dialogRef.close(response);  // Close the dialog
              },
              mailError => {
                console.error('Error sending mail', mailError);
              }
            );

          },
          error => {
            console.error('Error creating task', error);
          }
        );
      } else {
        console.error('Selected project not found');
      }
    }
  }  
 
  loadUsers(): void {
    const organization = localStorage.getItem('uorg'); 
    const loggedInUsername = localStorage.getItem('username');  // Get logged-in user's username
    if (organization) {
      this.securityService.getUsersByOrganization(organization).subscribe({
        next: (data) => {
          this.users = data;
          this.users = data.filter(user => user.username !== loggedInUsername);
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
    }
  }
 

  closeModal(): void {
    this.dialogRef.close();
  }
}

