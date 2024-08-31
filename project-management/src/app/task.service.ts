// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Task,TaskStatus } from './tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = "http://localhost:7001/projects"

  private taskSubject = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this.taskSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTasksByProject(projectId: number): Observable<any[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${projectId}/tasks`);
  }

  private TaskbaseUrl = "http://localhost:7001/tasks/tasks"

  // createTask(task:Task):Observable<any[]>{
  //    return this.http.post<any[]>(this.TaskbaseUrl, task);
  // }

  // localhost:7001/tasks/6
  private TaskDelbaseUrl = "http://localhost:7001/tasks"
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.TaskDelbaseUrl}/${taskId}`);
  }

  private taskUrl = "http://localhost:7001/tasks/project"
  private fetchTasks(id: any): void {
    this.http.get<Task[]>(`${this.taskUrl}/${id}`).subscribe(projects => {
      this.taskSubject.next(projects);
    });
  }

  // createTask(task: any): Observable<any> {
  //   return this.http.post(this.TaskbaseUrl, task).pipe(tap(()=>this.fetchTasks(task)))
  // }
  createTask(task: any): Observable<Task> {
    return this.http.post<Task>(this.TaskbaseUrl, task).pipe(
        tap(() => this.fetchTasks(task.projectId))  // Fetch tasks for the specific project
    );
}

addTask(task: Task): void {
  const currentTasks = this.taskSubject.getValue();
  this.taskSubject.next([...currentTasks, task]);
}
// localhost:7001/tasks/2/status?status=ONGOING
private taskUrlx = "http://localhost:7001";
updateTaskStatus(taskId: number, status: string): Observable<Task> {
  return this.http.put<Task>(`${this.taskUrlx}/tasks/${taskId}/status`, null, { params: { status } });
}

updateTaskProgress(taskId: number, progress: number): Observable<Task> {
  return this.http.put<Task>(`${this.taskUrlx}/tasks/${taskId}/progress`, null, { params: { progress: progress.toString() } });
}



}
