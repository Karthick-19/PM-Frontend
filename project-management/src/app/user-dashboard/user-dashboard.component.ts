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

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectsCreatedComponent, RouterLink],
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  recentProjects: Project[] = [];
  createdProjects: Project[] = [];
  assignedTasks: Task[] = [];

  username: string = '';
  organization: string = '';


  constructor(private projectService: ProjectServiceService, private router: Router
    , public dialog: MatDialog, private taskService: TaskService, private securityService: SecurityService
  ) {
    this.username = localStorage.getItem('uname') || 'User';
    this.organization = localStorage.getItem('uorg') || 'Organization'
  }

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));

    // Fetch projects I created
    this.projectService.getProjectsByUserId(userId).subscribe(projects => {
      this.createdProjects = projects;
    });

    // Fetch projects assigned to me
    // this.projectService.getAssignedProjects(userId).subscribe(projects => {
    //   this.assignedProjects = projects;
    // });

    // Fetch recent projects (for example, latest 5 projects)
    // this.projectService.getRecentProjects().subscribe(projects => {
    //   this.recentProjects = projects.slice(0, 5);
    // });
    const username = localStorage.getItem('username'); // Get the username from localStorage

    if (username) {
      this.projectService.getAssignedTasks(username).subscribe(
        (tasks) => {
          this.assignedTasks = tasks;
        },
        (error) => {
          console.error('Error fetching assigned tasks:', error);
        }
      );

      // Optionally, you can also fetch createdProjects and recentProjects here
      // this.fetchCreatedProjects();
      // this.fetchRecentProjects();
    } else {
      console.log('No username found in localStorage.');
    }
  }

  navigateToProject(projectId: number): void {
    this.router.navigate(['/projects', projectId]);
  }

  openUpdateTaskModal(task: Task): void {
    const dialogRef = this.dialog.open(UpdateTaskModalComponent, {
      width: '500px',
      data: { task: task }
    });

    //   dialogRef.afterClosed().subscribe(result => {
    //   //   if (result) {
    //   //     // Refresh the assigned tasks after update
    //   //     this.fetchAssignedTasks();
    //   //   }
    //   // });
    // }
    // fetchAssignedTasks(): void {
    //   const username = 'your-username'; // Replace with actual username retrieval logic
    //   this.taskService.getTasksByAssignedUser(username).subscribe((tasks: Task[]) => {
    //     this.assignedTasks = tasks;
    //   });
    // }
  }
  //   toggleSidebar(): void {
  //     const sidenav = document.querySelector('.sidenav');
  //     sidenav.classList.toggle('collapsed');
  // }
  logout() {
    this.securityService.signOut()
  }


}
