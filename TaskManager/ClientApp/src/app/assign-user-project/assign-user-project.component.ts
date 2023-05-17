import { Component, OnInit} from '@angular/core';
import { ProjectRm, UserRm } from '../api/models';
import { ProjectService } from './../api/services/project.service';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserProjectService, UserService } from '../api/services';

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { catchError, finalize, of, Subscription } from 'rxjs';
import { UserProjectDialogComponent } from '../dialog/user-project-dialog/user-project-dialog.component';


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

  //used to display an error div. if true, it'll show up
  alreadyAssignedError = false;


    constructor(
      private projectService: ProjectService,
      private userProjectService: UserProjectService,
      private userService: UserService,
      private fb: FormBuilder,
      private router: Router,
      private dialog: MatDialog
  ) { }

 


  form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])]    
  })

  ngOnInit(): void {
    //getting the projects for dropdown menue
    this.projectService.getProjectsProject({})
      .subscribe(response => this.projectList = response, this.handleError)

  }

  //takes the value from the selected drop down for project, grabs the id, assigns it to this.projectId
  getId(value: any) {
    this.projectId = value;
    console.log(this.projectId);  
    
  }

  //assign the user to the project, display error and success message
  assignUser() {  

    if (this.form.invalid)
      return;

    this.userProjectService.findUserProject({ projectId: this.projectId ?? '' })
      .subscribe(response => {
        this.userList = response; console.log(this.userList);

        //every single available user is in this project. won't happen in production but 
        //takes place on DEV
        if (this.userList.length == 0) {
          this.openDialog("already-assigned", <any>this.form.value.email);
          //this.alreadyAssignedError = true;
          console.log("userlist = 0, User is already assigned to project.");
        }
        else {
          let emailInList: boolean = false;

          for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].email?.includes(<any>this.form.value.email)) {
              emailInList = true;
            }
          }

          if (emailInList == false) {
            this.openDialog("already-assigned", <any>this.form.value.email);
            console.log("user email in list, User is already assigned to project.");
          }
          else {
            this.userProjectService.assignUserToProjectUserProject({ projectId: this.projectId ?? '', email: this.form.value.email ?? '' }).subscribe(
              result => { console.log(result) }, error => { console.log(error), () => { console.log("complete") } });
            this.openDialog("success", <any>this.form.value.email);
          }
        }

      }, this.handleError);


    //example of result, error, and complete
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

  openDialog(component: string, email: string) {

  
    if (component == "already-assigned") {
      const dialogRef = this.dialog.open(UserProjectDialogComponent, {
        data: { title: "Error:", message: "The user is already assigned to the project." }
      });
    }

    else {
      let emailString: string = `The user with email ${email} was successfully added to the project.`;
      const dialogRef = this.dialog.open(UserProjectDialogComponent, {
        data: { title: "Success", message: emailString }
      });
    }

    /*dialogRef.afterClosed().subscribe(
      result => console.log("Dialog Result", result)
    );*/

  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }


}
