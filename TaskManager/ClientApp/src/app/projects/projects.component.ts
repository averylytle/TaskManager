import { Component, OnInit} from '@angular/core';
import { ProjectService } from './../api/services/project.service';
import { TaskService } from './../api/services/task.service';
import { TasksDto, TasksRm, ProjectRm, ProjectTaskRm } from '../api/models';
import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TestingDialogComponent } from '../testing-dialog/testing-dialog.component';


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

  //animal!: string;

  constructor(private projectService: ProjectService,
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService,
    private dialog: MatDialog  ) { }

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

  openDialog() {


    /*const dialogRef = this.dialog.open(TestingDialogComponent, {
      data: { animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.animal = result;
    })
*/


    const dialogRef = this.dialog.open(TestingDialogComponent, {
      data: { title: "Hello, World!"}
      });

    dialogRef.afterClosed().subscribe(
    result => console.log("Dialog Result", result)
    );
    

    /*const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    this.dialog.open(TestingDialogComponent, dialogConfig);
*/
   
  }


  createProject() {
    this.router.navigate(['/create-project'])
  }

  assignUser() {

  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

}
