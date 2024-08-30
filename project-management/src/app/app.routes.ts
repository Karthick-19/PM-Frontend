import { Routes } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';
// import { CreateTaskComponent } from './create-task/create-task.component';

export const routes: Routes = 
    // // { path: 'projects/create', component: ProjectCreateComponent, outlet: 'modal' }, 
    // { path: '', redirectTo: '/projects', pathMatch: 'full' },
    // // { path: 'projects/:id', component: ProjectDetailComponent },
    // // { path: 'task-create', component: CreateTaskComponent },
    // { path: 'projects', component: ProjectListComponent },
    // { path: '', redirectTo: '/projects', pathMatch: 'full' },  // Optional: redirect root to project list
    // { path: '**', redirectTo: '/projects' },
    [
        { path: 'projects', component: ProjectListComponent },
        { path: 'projects/create', component: ProjectCreateComponent, outlet: 'modal' }, // Named outlet route
        { path: '', redirectTo: '/projects', pathMatch: 'full' },
        { path: '**', redirectTo: '/projects' },
      ];


