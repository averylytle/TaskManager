import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { TaskService } from './../api/services/task.service';
import { ProjectService } from './../api/services/project.service';
import { AuthService } from './../auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksListComponent } from '../tasks-list/tasks-list.component';
import { Project } from '../api/models';
/*import { Guid } from 'guid-typescript';
import { isStringObject } from 'util/types';*/


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  //public id = '';

  projectIds: string[] = [];

  //public projectId = '';

  hardCodedId: string = "3FA85F64-5717-4562-B3FC-2C963F66AFA6";

  //@Input() parentProjectId = '';

  //@ViewChild(TasksListComponent) child: TasksListComponent | undefined;

  constructor(private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    //@Inject(TasksListComponent) private tasksListParent: TasksListComponent,
    private authService: AuthService,
    private projectService: ProjectService

  ) { }

  form = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    description: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
    //dueDate: [new Date()],
    assignedEmail: [''],
    priority: [''],
    projectId: ['']
    //,projectId: [this.projectId] //this.child?.projectIds[0]
    })

  ngOnInit(): void {

    this.projectService.getProjectIdsProject({ email: this.authService.currentUser?.email ?? '' })
      .subscribe(response => this.projectIds = response)


    //this.id = this.idservice.generate()
    //this.projectId = <any>this.child?.projectIds[0]

    //console.log('parent projectId', this.tasksListParent.projectIds[0])

    //console.log(this.projectId)
  }

  /*ngOnDestroy(): void {
    //this.idservice.remove(this.id)
  }*/

  addTask() {

    if (this.form.invalid)
      return;

    //testing getting the projectId
    //this.form.get('projectId')
    this.form.patchValue({projectId: this.projectIds[0]})

    //console.log("Form values:", this.form.value);
    this.taskService.addTaskTask({ body: <any>this.form.value }).subscribe()
    this.router.navigate(['/tasks'])
  }

}
