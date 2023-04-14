import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../api/services/project.service';
import { TaskService } from './../api/services/task.service';
import { TasksDto, TasksRm, ProjectRm, ProjectTaskRm } from '../api/models';
import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectList: ProjectRm[] = []

  projectTaskList: ProjectTaskRm[] = []

  projectId: string[] = [];

  constructor(private projectService: ProjectService,
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService) { }

  ngOnInit(): void {
    /*if (!this.authService.currentUser?.email)
      this.router.navigate(['/register-user'])*/

    this.projectService.getProjectsProject({})
      .subscribe(response => this.projectList = response, this.handleError)



    //this doesn't work yet. Not sure why. Trying to grab the project Id then pass it to get projectTaskRms'
    this.projectService.getProjectIdsProject({ email: this.authService.currentUser?.email ?? '' })
      .subscribe(response => this.projectId = response, this.handleError)

    this.taskService.listTasksTask({ projectId: this.projectId[0] ?? '' })
      .subscribe(response => this.projectTaskList = response, this.handleError)

  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

}
