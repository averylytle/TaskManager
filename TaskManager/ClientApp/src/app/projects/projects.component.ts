import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../api/services/project.service';
import { TasksDto, TasksRm, ProjectRm } from '../api/models';
import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectList: ProjectRm[] = []

  constructor(private projectService: ProjectService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    /*if (!this.authService.currentUser?.email)
      this.router.navigate(['/register-user'])*/

    this.projectService.getProjectsProject({})
      .subscribe(response => this.projectList = response, this.handleError)

  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

}
