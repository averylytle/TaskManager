/* tslint:disable */
/* eslint-disable */
import { Project } from './project';
import { ProjectUser } from './project-user';
export interface User {
  email?: null | string;
  firstName?: null | string;
  lastName?: null | string;
  projectUsers?: null | Array<ProjectUser>;
  projects?: null | Array<Project>;
}
