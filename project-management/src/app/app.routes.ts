import { Routes } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
// import { CreateTaskComponent } from './create-task/create-task.component';

export const routes: Routes = [
    { path: 'projects/create', component: ProjectCreateComponent, outlet: 'modal' }, 
    // { path: '', redirectTo: '/projects', pathMatch: 'full' },
    { path: 'projects/:id', component: ProjectDetailComponent },
    // { path: 'task-create', component: CreateTaskComponent },
];
