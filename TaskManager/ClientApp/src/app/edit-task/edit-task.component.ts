import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService, UserProjectService } from '../api/services';
import { TasksRm, TasksDto, ProjectRm } from '../api/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private taskService: TaskService,
              private userProject: UserProjectService
                ) { }

  taskId: string = 'not loaded'

  tasksList: TasksRm[] = []

  projectId: string = ''
  projectList: ProjectRm[] = []


  form = this.fb.group({
    name: [''],
    description: [''],
    assignedEmail: [''],
    priority: ['']

    /*name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    description: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
    assignedEmail: [''],
    priority: ['']*/

  })

  ngOnInit(): void {

    //taskId is getting pulled from app.module.ts by paramMap activatedRoute
    this.route.paramMap
      .subscribe(p => this.findTask(p.get("taskId")))

    this.userProject.getProjectIdFromTaskIdUserProject({ taskId: this.taskId })
      .subscribe(response => { this.projectId = response; });
  }

  private findTask = (taskId: string | null) => {
    this.taskId = taskId ?? 'not passed'

    this.taskService.getTaskByIdTask({ taskId: this.taskId })
      .subscribe(task => this.tasksList = task);

    /*this.flightService.findFlight({ id: this.flightId })
      *//*setting this.flight to equal the flight we find through the API call*//*
      .subscribe(flight => this.flight = flight, this.handleError)*/
  }

  editTask() {

    //this.form.updateValueAndValidity();

    if (this.form.invalid)
      return;


    //checking to see if any of the task values were edited. If not, set the value to the associated var.
    //if you don't do this, when you submit the form it'll send empty strings for values that aren't edited
    var varAsignedEmail = "";
    var varDescription = "";
    var varName = "";
    var varPriority = "";

    if (<any>this.form.value.assignedEmail == "") {
      varAsignedEmail = <any>this.tasksList[0].assignedEmail;
    }
    else {
      varAsignedEmail = <any>this.form.value.assignedEmail;
    }

    if (<any>this.form.value.description == "") {
      varDescription = <any>this.tasksList[0].description;
    }
    else {
      varDescription = <any>this.form.value.description;
    }

    if (<any>this.form.value.name == "") {
      varName = <any>this.tasksList[0].name;
    }
    else {
      varName = <any>this.form.value.name;
    }

    if (<any>this.form.value.priority == "") {
      varPriority = <any>this.tasksList[0].priority;
    }
    else {
      varPriority = <any>this.form.value.priority;
    }


    const taskDto: TasksDto = {
      assignedEmail: varAsignedEmail,
      description: varDescription,
      name: varName,
      priority: varPriority,
      projectId: this.projectId,
      taskId: this.taskId
    }

    this.taskService.editTask({ body: taskDto }).subscribe(_ => this.router.navigate(['/tasks']));

  }

}
