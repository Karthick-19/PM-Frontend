import { Routes } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
// import { CreateTaskComponent } from './create-task/create-task.component';

export const routes: Routes =
  [
    { path: 'projects', component: ProjectListComponent },
    { path: 'projects/create', component: ProjectCreateComponent, outlet: 'modal' },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: '', redirectTo: '/projects', pathMatch: 'full' },
    { path: '**', redirectTo: '/projects' }
  ];


