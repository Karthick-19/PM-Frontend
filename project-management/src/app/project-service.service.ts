import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private baseUrl = 'http://localhost:7001/projects'; 

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getProject(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project);
  }

  getProjectById(projectId: number): Observable<Project> {
    const url = `${this.baseUrl}/${projectId}`;
    return this.http.get<Project>(url);
  }
  // getTasksByProject(projectId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}?projectId=${projectId}`);
  // }
}
