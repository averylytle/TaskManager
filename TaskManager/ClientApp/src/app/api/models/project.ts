/* tslint:disable */
/* eslint-disable */
import { ProjectUser } from './project-user';
import { Tasks } from './tasks';
import { User } from './user';
export interface Project {
  projectDescription?: null | string;
  projectId?: string;
  projectName?: null | string;
  projectUsers?: null | Array<ProjectUser>;
  tasks?: null | Array<Tasks>;
  users?: null | Array<User>;
}
