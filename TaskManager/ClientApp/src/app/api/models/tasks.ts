/* tslint:disable */
/* eslint-disable */
import { Project } from './project';
export interface Tasks {
  assignedEmail?: null | string;
  description?: null | string;
  isComplete?: number;
  name?: null | string;
  priority?: null | string;
  project?: Project;
  taskId?: string;
}
