import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';

import { TaskService } from './../api/services/task.service';
import { CompletedTasksService } from './../api/services/completed-tasks.service';
import { ProjectService } from './../api/services/project.service';
import { TasksDto, TasksRm, ProjectTaskRm } from '../api/models';
import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasksList: TasksRm[] = []

  completedTasksList: TasksRm[] = []

  projectTaskList: ProjectTaskRm[] = []

  projectIds: string[] = [];

  

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private completedService: CompletedTasksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {  }

  /*  taskForm = this.fb.group({
  
      })*/

  ngOnInit(): void {



    if (!this.authService.currentUser?.email)
      this.router.navigate(['/register-user'])

    this.taskService.listTasksByUserTask({ email: this.authService.currentUser?.email ?? '' })
      .subscribe(response => this.tasksList = response, this.handleError)


    this.projectService.getProjectIdsProject({ email: this.authService.currentUser?.email ?? '' })
      .subscribe(response => this.projectIds = response, this.handleError)


    this.completedService.listCompleteCompletedTasks({})
      .subscribe(response => this.completedTasksList = response, this.handleError)


  }



   addTask(){
    this.router.navigate(['/add-task'])
  }
  editTask() {
    this.router.navigate(['/edit-task'])
  }

  markComplete() {
    /*const dto: TasksDto = {
      taskId: this.tasksList[0].taskId
    };*/



    //why am I using a read model here? shouldn't it be a DTO?
    const rm: TasksRm = {
      taskId: this.tasksList[0].taskId
    }
    this.taskService.completeTask({ taskId: rm.taskId, projectId: this.projectIds[0] })
      .subscribe(_ => { this.tasksList.filter(x => !x.selected) })
    this.tasksList = this.tasksList.filter(x => !x.selected);

    //can't figure out how to have the task show up immediately in the completed tasks section.
    //maybe has to do with needing to update the subscription?

  }

/*  onCheckboxChange(e) {
    if (e.target.checked) {

    }
  }*/

/*  deleteTask(task: TasksDto) {
    const dto: TasksDto = {
      taskId: task.taskId
    };

    this.taskService.deleteTask({ taskId: dto.taskId })
      .subscribe(_ => this.tasksList)
  }*/


/*  switchClicked(event) {
    console.log(event.srcElement.checked);
  }*/


  /*  searchTasks() {
      this.taskService.searchTask({})
        .subscribe(response => this.tasksList = response, this.handleError)
    }*/

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

}
