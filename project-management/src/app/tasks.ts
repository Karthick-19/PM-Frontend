// src/app/models/task.model.ts
export class Task {
    id!: number;
    name!: string;
    description!: string;
    status!: string;
    progress!: number;
    createdDate!: string;
    deadline!: string;
    projectId!: number; // Or link to the project model if needed
  }

  // tasks.ts or task-status.ts (wherever appropriate)
export enum TaskStatus {
  TODO = 'TODO',
  ONGOING = 'ONGOING',
  TESTING = 'TESTING',
  COMPLETED = 'COMPLETED'
}

  