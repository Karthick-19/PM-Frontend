import { Routes } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
// import { CreateTaskComponent } from './create-task/create-task.component';

export const routes: Routes =
  [
    { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [authGuard]},
    { path: 'projects', component: ProjectListComponent, canActivate: [authGuard] },
    { path: 'projects/create', component: ProjectCreateComponent, outlet: 'modal', canActivate: [authGuard] },
    { path: 'edit-profile', component: EditProfileComponent, canActivate: [authGuard] },
    {path: '', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    // { path: '**', redirectTo: '/projects' },
    
  ];


