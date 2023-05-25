import { MatMenuModule } from '@angular/material/menu';
import { Component, OnInit } from '@angular/core';
import { AssignUserProjectComponent } from '../assign-user-project/assign-user-project.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectTaskService } from '../api/services';
import { ProjectTaskRm } from '../api/models';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;


  constructor(
    private route: ActivatedRoute,
    private projectTaskService: ProjectTaskService
  ) { }


  //below project info is used to populate the dropdown menu of projects.

  projectId: string = ''

  projectTaskList: ProjectTaskRm[] = []

  ngOnInit(): void {
    //projectId is getting pulled from app.module.ts by paramMap activatedRoute
    this.route.paramMap
      .subscribe(p => this.findProjectTask(p.get("projectId")));
  }

  private findProjectTask = (projectId: string | null) => {
    this.projectId = projectId ?? 'not passed'

    this.projectTaskService.listTasksByProjectProjectTask({ projectId: this.projectId })
      .subscribe(projectTask => this.projectTaskList = projectTask);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
