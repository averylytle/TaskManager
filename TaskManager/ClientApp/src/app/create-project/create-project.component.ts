import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from './../api/services/project.service';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService
  ) { }

  form = this.fb.group({
    projectName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    description: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])]
  })

  ngOnInit(): void {
  }

  createProject() {
    if (this.form.invalid)
      return;

    console.log(this.form.value)
    this.projectService.createProjectProject({body: <any>this.form.value}).subscribe()

    /*this.taskService.addTaskTask({ body: <any>this.form.value }).subscribe()
    this.router.navigate(['/tasks'])*/
  }

}
