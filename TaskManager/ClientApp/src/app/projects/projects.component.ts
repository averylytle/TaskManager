import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../api/services/project.service';
import { TaskService } from './../api/services/task.service';
import { TasksDto, TasksRm, ProjectRm, ProjectTaskRm } from '../api/models';
import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { mergeMap, map, delay, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectList: ProjectRm[] = []

  projectTaskList: ProjectTaskRm[] = []

  projectIds: string[] = [];

  hardCodedId: string = "3FA85F64-5717-4562-B3FC-2C963F66AFA6";

  constructor(private projectService: ProjectService,
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.currentUser?.email)
      this.router.navigate(['/register-user'])

    this.projectService.getProjectsProject({})
      .subscribe(response => this.projectList = response, this.handleError)


    this.projectService.getProjectIdsProject({ email: this.authService.currentUser?.email ?? '' })
      .subscribe(response => { this.projectIds = response; console.log("projectidscall", this.projectIds) }, this.handleError)

    const getProjectIds = this.projectService.getProjectIdsProject({ email: this.authService.currentUser?.email ?? '' });

    //it works!!
    getProjectIds.pipe(mergeMap(
      projectId => { return this.taskService.listTasksTask({ projectId: projectId[0] }) }
    )).subscribe(response => this.projectTaskList = response)

   
  }

  createProject() {
    this.router.navigate(['/create-project'])
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

}
