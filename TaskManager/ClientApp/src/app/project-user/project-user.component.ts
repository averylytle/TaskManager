/*
An individual's project page.
This will be the most used page in the application. Will show the user's project and all the tasks.
Will only display information for one project. Will have to have a dropdown to choose which project you want to view
*/

import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProjectService, ProjectTaskService, TaskService, UserProjectService } from '../api/services';
import { TasksRm, TasksDto, ProjectRm, ProjectTaskRm } from '../api/models';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, ThemePalette } from '@angular/material';
import { AuthService } from '../auth/auth.service';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-project-user',
  templateUrl: './project-user.component.html',
  styleUrls: ['./project-user.component.css']
})
export class ProjectUserComponent implements OnInit {

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' },
    ],
  };

  constructor(private projectService: ProjectService,
    private authService: AuthService,
    private userProjectService: UserProjectService,
    private taskService: TaskService,
    private projectTaskService: ProjectTaskService,
    private router: Router,
      ) { }

  projectList: ProjectRm[] = []

  projectId: string = '';

  projectTaskList: ProjectTaskRm[] = []

  projectRmControl = new FormControl<ProjectRm | null>(null, Validators.required);
  public show: boolean = false;

  /*projectId: string = ''

  */

  ngOnInit(): void {

    if (!this.authService.currentUser?.email)
      this.router.navigate(['/register-user'])

    //getting the projects for dropdown menu
    /*this.projectService.getProjectsProject({})
      .subscribe(response => this.projectList = response, this.handleError);*/
    this.userProjectService.getProjectByEmailUserProject({ email: this.authService.currentUser?.email ?? '' })
      .subscribe(response => this.projectList = response, this.handleError);

  }

  
  //takes the value from the selected drop down for project, grabs the id, assigns it to this.projectId
  getId(value: any) {
    this.projectId = value;
    console.log(this.projectId);

    //this.getTasks();
    this.projectTaskService.listTasksByProjectProjectTask({ projectId: this.projectId })
      .subscribe(response => this.projectTaskList = response);

    this.show = !this.show;
    

  }

  getTasks() {
    this.projectTaskService.listTasksByProjectProjectTask({ projectId: this.projectId })
      .subscribe(response => this.projectTaskList = response);

    this.show = !this.show;
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

}
