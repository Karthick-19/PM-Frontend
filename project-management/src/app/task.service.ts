// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = "http://localhost:7001/projects"

  constructor(private http: HttpClient) {}

  getTasksByProject(projectId: number): Observable<any[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${projectId}/tasks`);
  }

  private TaskbaseUrl = "http://localhost:7001/tasks/tasks"

  // createTask(task:Task):Observable<any[]>{
  //    return this.http.post<any[]>(this.TaskbaseUrl, task);
  // }

  createTask(task: any): Observable<any> {
    return this.http.post(this.TaskbaseUrl, task);
  }
  private TaskDelbaseUrl = "http://localhost:7001/tasks"
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.TaskDelbaseUrl}/${taskId}`);
  }
}
