import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjectServiceService } from '../project-service.service';
import { Project } from '../project';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsCreatedComponent } from './projects-created/projects-created.component';
import { Task } from '../tasks';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskModalComponent } from '../update-task-modal/update-task-modal.component';
import { TaskService } from '../task.service';
import { SecurityService } from '../security.service';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import { ATask } from '../ATask';
// import { WebSocketService } from '../websocket.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectsCreatedComponent, RouterLink, ProjectCreateComponent],
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  recentProjects: Project[] = [];
  createdProjects: Project[] = [];
  assignedTasks: ATask[] = [];
  
  showCalendar: boolean = false;

  username: string = '';
  organization: string = '';

  tasks: any[] = [];
  completions: any[] = [];


  constructor(private projectService: ProjectServiceService, private router: Router
    , public dialog: MatDialog, private securityService: SecurityService,
    // private webSocketService: WebSocketService
  ) {
    this.username = localStorage.getItem('uname') || 'User';
    this.organization = localStorage.getItem('uorg') || 'Organization'
  }

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));

    this.projectService.getProjectsByUserId(userId).subscribe(projects => {
      this.createdProjects = projects;
    });

    const username = localStorage.getItem('username'); // Get the username from localStorage
    // this.webSocketService.connect();

    // if(username){
    // // Subscribe to task assignment notifications
    // this.webSocketService.subscribeToTaskNotifications(username).subscribe((task) => {
    //   this.tasks.push(task);
    // });

    // // Subscribe to task completion notifications
    // this.webSocketService.subscribeToCompletionNotifications(username).subscribe((task) => {
    //   this.completions.push(task);
    // });
  // }

    if (username) {
      this.projectService.getAssignedTasks(username).subscribe(
        
        (tasks) => {
          console.log(tasks)
          this.assignedTasks = tasks;
        },
        (error) => {
          console.error('Error fetching assigned tasks:', error);
        }
      );

    } else {
      console.log('No username found in localStorage.');
    }
    
  }
  

  signOut() {
    this.securityService.signOut();
  }
  navigateToProject(projectId: number): void {
    this.router.navigate(['/projects', projectId]);
  }


  openUpdateTaskModal(task: Task): void {
    const dialogRef = this.dialog.open(UpdateTaskModalComponent, {
      width: '500px',
      data: { task: task }
    });
    dialogRef.componentInstance.taskUpdated.subscribe(() => {
      this.loadAssignedTasks(); // Refresh tasks after update
    });
  }

  loadAssignedTasks(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.projectService.getAssignedTasks(username).subscribe(
        tasks => {
          this.assignedTasks = tasks;
        },
        error => {
          console.error('Error fetching assigned tasks:', error);
        }
      );
    } else {
      console.log('No username found in localStorage.');
    }
  }

  logout() {
    this.securityService.signOut()
  }
  opencreateprojects() {
    this.router.navigate(["/projects"]);
  }

  navigateToEdit() {
    this.router.navigate(["/edit-profile"])
  }

}
