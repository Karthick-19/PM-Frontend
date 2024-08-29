import { Routes } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

export const routes: Routes = [
    { path: 'projects/create', component: ProjectCreateComponent, outlet: 'modal' }, 
    { path: '', redirectTo: '/projects', pathMatch: 'full' },
    { path: 'projects/:id', component: ProjectDetailComponent }
];
