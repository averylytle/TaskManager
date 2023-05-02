import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectRm, UserRm } from '../api/models';
import { ProjectService } from './../api/services/project.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserProjectService, UserService } from '../api/services';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-assign-user-project',
  templateUrl: './assign-user-project.component.html',
  styleUrls: ['./assign-user-project.component.css']
})
export class AssignUserProjectComponent implements OnInit {

  projectList: ProjectRm[] = []

  userList: UserRm[] = []

  projectId: string = '';

  selectedEmail: string = '';

  projectRmControl = new FormControl<ProjectRm | null>(null, Validators.required);
  userRmControl = new FormControl<UserRm | null>(null, Validators.required);

  selectedFormControl = new FormControl('', Validators.required);


    constructor(
      private projectService: ProjectService,
      private userProjectService: UserProjectService,
      private userService: UserService,
      private fb: FormBuilder,
      private router: Router
  ) { }


  form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])]    
  })

  ngOnInit(): void {
    //getting the projects.

    //this is going to get complicated. I need the list of projects to be able to select one, but once one is selected, I need to get its projectId
    this.projectService.getProjectsProject({})
      .subscribe(response => this.projectList = response, this.handleError)

    /*//loading a list of all users 
    this.userService.findAllUsersUser()
      .subscribe(response => this.userList = response, this.handleError);*/

  }

  //takes the value from the selected drop down for project, grabs the id, assigns it to this.projectId
  getId(value: any) {
    this.projectId = value;
    console.log(this.projectId);



    /*this.userProjectService.findUserProject({ projectId: this.projectId ?? '' })
      .subscribe(response => { this.userList = response; console.log("userlist:", this.userList) }, this.handleError);

    console.log("userlist:", this.userList);*/

    
    
  }

  /*getEmail(value: any) {
    this.selectedEmail = value;
  }*/

  assignUser() {
    /*console.log("testing", this.selectedEmail, this.projectId);
    this.userProjectService.assignUserToProjectUserProject({ projectId: this.projectId, email: this.selectedEmail }).subscribe();*/

    if (this.form.invalid)
      return;

    this.userProjectService.findUserProject({ projectId: this.projectId ?? '' })
      .subscribe(response => { this.userList = response }, this.handleError);

    //default project - should get reynalda only as not in the project
    //IT WORKS!!!!!!
    for (let i = 0; i < this.userList.length; i++) {
      if (!(this.userList[i].email?.includes(<any>this.form.value.email))) {
        console.log("User is already assigned to project.");
        return;
      }
      else {
        //I want to navigate to the project page if successful. right now it doesn't do that'
        this.userProjectService.assignUserToProjectUserProject({ projectId: this.projectId ?? '', email: this.form.value.email ?? '' }).subscribe(
          result => { console.log(result) }, error => { console.log(error), () => { console.log("complete") } }
        );
      }
    }

    

    



    /*this.userProjectService.assignUserToProjectUserProject({ projectId: this.projectId ?? '', email: this.form.value.email ?? '' })
      .pipe(finalize(() => this.router.navigate(['/project'])))//IDEA: Popup a success message instead of redirecting
      .subscribe(
        result => { console.log(result) }
        , error => {
          console.log(error)
          , () => { console.log("complete") }
        }
    );*/


    /*this.userProjectService.assignUserToProjectUserProject({ projectId: this.projectId ?? '', email: this.form.value.email ?? '' })
      .pipe(
        catchError(err => {
          throw 'error in source. details:' + err;
          
        }))  
      .subscribe(
        result => { console.log(result) }
        , error => {
          console.log(error)
            , () => { console.log("complete") }
        }
      );*/


   }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

}
