// src/app/models/task.model.ts
export class ATask {
    id!: number;
    name!: string;
    taskId!:number;
    description!: string;
    taskName!: string;
    taskDescription!: string;
    status!: TaskStatus;
    progress!: number;
    createdDate!: string;
    deadline!: string;
    projectId!: number; // Or link to the project model if needed
    assignedTo!: string;  // Add this field for task assignment
    projectName!:string;
    projectDescription!:string;
  }

  // tasks.ts or task-status.ts (wherever appropriate)
export enum TaskStatus {
  TODO = 'TODO',
  ONGOING = 'ONGOING',
  TESTING = 'TESTING',
  COMPLETED = 'COMPLETED'
}

  