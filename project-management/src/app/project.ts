import { Task } from "./tasks";

// src/app/models/project.model.ts
export class Project {
    id!: number;
    name!: string;
    description!: string;
    createdDate!: string;
    leadId!: number;
    tasks!:Task[];
    // Add other fields as needed
  }
  