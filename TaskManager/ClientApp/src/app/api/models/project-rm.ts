/* tslint:disable */
/* eslint-disable */
import { Tasks } from './tasks';
import { User } from './user';
export interface ProjectRm {
  projectDescription?: null | string;
  projectId?: string;
  projectName?: null | string;
  tasks?: null | Array<Tasks>;
  users?: null | Array<User>;
}
