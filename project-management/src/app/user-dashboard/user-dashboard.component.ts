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
import { Chart, ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
// import { ChartsModule } from 'ng2-charts';
import {
  PieController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';




@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectsCreatedComponent, RouterLink, ProjectCreateComponent,BaseChartDirective],
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
  timeline!:string

  tasks: any[] = [];
  completions: any[] = [];

  taskChart: any;
  assignedTaskChart: any;

  user!:any;
  

  constructor(private projectService: ProjectServiceService, private router: Router
    , public dialog: MatDialog, private securityService: SecurityService,
    // private webSocketService: WebSocketService
  ) {
    // this.securityService.getLoggedinUser(this.user).subscribe({
    //   next: (data) => {
    //     this.username=data.name
    //   }})
    this.username = localStorage.getItem('uname') || 'User';
    this.timeline = localStorage.getItem('utimeline') || 'Timeline'
    this.organization = localStorage.getItem('uorg') || 'Organization'
    Chart.register(PieController, ArcElement, Tooltip, Legend);
  }

  ngOnInit(): void {

    const userId = Number(localStorage.getItem('userId'));

    this.projectService.getProjectsByUserId(userId).subscribe(projects => {
      this.createdProjects = projects;
      this.loadTaskChart();
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
          this.loadAssignedTaskChart();
        },
        (error) => {
          console.error('Error fetching assigned tasks:', error);
        }
      );

    } else {
      console.log('No username found in localStorage.');
    }
    
  }

  isNavCollapsed = false;

  toggleNav() {
    this.isNavCollapsed = !this.isNavCollapsed;
  }

  loadTaskChart(): void {
    // Task status counters
    let todoCount = 0;
    let ongoingCount = 0;
    let testingCount = 0;
    let completedCount = 0;
  
    // Loop through the projects and their tasks to count statuses
    this.createdProjects.forEach((project) => {
      project.tasks.forEach((task) => {
        switch (task.status) {
          case 'TODO':
            todoCount++;
            break;
          case 'ONGOING':
            ongoingCount++;
            break;
          case 'TESTING':
            testingCount++;
            break;
          case 'COMPLETED':
            completedCount++;
            break;
        }
      });
    });
  
    // Use the counted statuses for the chart
    const taskStatusData = [todoCount, ongoingCount, testingCount, completedCount]; // Order: TODO, ONGOING, TESTING, COMPLETED
    const taskLabels = ['TODO', 'ONGOING', 'TESTING', 'COMPLETED'];
    const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
  
    // Pie chart configuration
    const chartConfig: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: taskLabels,
        datasets: [{
          data: taskStatusData,
          backgroundColor: backgroundColors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    };
  
    const canvas = <HTMLCanvasElement>document.getElementById('taskChart');
    this.taskChart = new Chart(canvas, chartConfig);
  }
  
  loadAssignedTaskChart(): void {
        // Task status counters
        let todoCount = 0;
        let ongoingCount = 0;
        let testingCount = 0;
        let completedCount = 0;
      
        // Loop through the projects and their tasks to count statuses
        this.assignedTasks.forEach((task) => {
          // project.tasks.forEach((task) => {
            switch (task.status) {
              case 'TODO':
                todoCount++;
                break;
              case 'ONGOING':
                ongoingCount++;
                break;
              case 'TESTING':
                testingCount++;
                break;
              case 'COMPLETED':
                completedCount++;
                break;
            }
          });
        
    const assignedTaskStatusData = [todoCount, ongoingCount, testingCount, completedCount]; // Mock data for 'Tasks Assigned to You'
    const assignedTaskLabels = ['TODO', 'ONGOING', 'TESTING', 'COMPLETED'];
    const assignedTaskColors = ['#FF9F40', '#FF6384', '#36A2EB', '#FFCE56'];

    const assignedTaskChartConfig: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: assignedTaskLabels,
        datasets: [{
          data: assignedTaskStatusData,
          backgroundColor: assignedTaskColors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    };

    const assignedTaskCanvas = <HTMLCanvasElement>document.getElementById('assignedTaskChart');
    this.assignedTaskChart = new Chart(assignedTaskCanvas, assignedTaskChartConfig);
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
