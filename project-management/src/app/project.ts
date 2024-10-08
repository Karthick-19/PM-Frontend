import { Task } from "./tasks";

// src/app/models/project.model.ts
export class Project {
    next(data: Project[]) {
      throw new Error('Method not implemented.');
    }
    id!: number;
    name!: string;
    description!: string;
    createdDate!: string;
    leadId!: number;
    tasks!:Task[];
    // Add other fields as needed
  }
  