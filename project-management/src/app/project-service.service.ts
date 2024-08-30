import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  projects!:Project
  private baseUrl = 'http://localhost:7001/projects'; 

  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$: Observable<Project[]> = this.projectsSubject.asObservable();


  constructor(private http: HttpClient) {
    this.getAllProjects();
   }

  
   private fetchProjects(): void {
    this.http.get<Project[]>(this.baseUrl).subscribe(projects => {
      this.projectsSubject.next(projects);
    });
  }
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getProject(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project).pipe(tap(() => this.fetchProjects())); // Refresh the project list after creation
  }

  getProjectById(projectId: number): Observable<Project> {
    const url = `${this.baseUrl}/${projectId}`;
    return this.http.get<Project>(url);
  }
  getTasksByProject(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?projectId=${projectId}`);
  }
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${projectId}`).pipe(
      tap(() => this.fetchProjects()));
  }
  // In your project service
// refreshProjects(): void {
//   this.http.get<Project[]>('api/projects').subscribe(data => {
//     this.projects.next(data); // Assuming you have a BehaviorSubject to hold the projects
//   });
// }  
getProjectsx(): Project[] {
  return this.projectsSubject.getValue();
}

// Method to update the projects list
updateProjects(projects: Project[]): void {
  this.projectsSubject.next(projects);
}

// Method to add a new project
addProject(project: Project): void {
  const currentProjects = this.projectsSubject.getValue();
  this.projectsSubject.next([...currentProjects, project]);
}

// Method to delete a project
// deleteProjectx(projectId: number): void {
//   const currentProjects = this.projectsSubject.getValue();
//   this.projectsSubject.next(currentProjects.filter(p => p.id !== projectId));
// }
removeProject(projectId: number): void {
  this.projects$.pipe(
    take(1), // Take the latest value from the observable
    map(projects => projects.filter(project => project.id !== projectId))
  ).subscribe(updatedProjects => this.projectsSubject.next(updatedProjects));
}

}
