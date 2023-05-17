import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';

import { TaskService } from './../api/services/task.service';
import { CompletedTasksService } from './../api/services/completed-tasks.service';
import { ProjectService } from './../api/services/project.service';
import { TasksDto, TasksRm, ProjectTaskRm, CompletedTaskDto } from '../api/models';
import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';


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


    /*
     *
     * //it works!!
     *
     *const getProjectIds = this.projectService.getProjectIdsProject({ email: this.authService.currentUser?.email ?? '' });
     * 
    getProjectIds.pipe(mergeMap(
      projectId => { return this.taskService.listTasksTask({ projectId: projectId[0] }) }
    )).subscribe(response => this.projectTaskList = response)*/

    const getProjectIds = this.projectService.getProjectIdsProject({ email: this.authService.currentUser?.email ?? '' });

    getProjectIds.pipe(mergeMap(
      projectId => {
        return this.completedService
          .listCompleteCompletedTasks({ projectId: projectId[0], email: this.authService.currentUser?.email ?? '' })
      }
    )).subscribe(response => this.completedTasksList = response);


    /*this.completedService.listCompleteCompletedTasks({ projectId: this.projectIds[0], email: this.authService.currentUser?.email ?? '' })
      .subscribe(response => { this.completedTasksList = response; console.log(this.projectIds[0]); this.handleError })*/


  }



   addTask(){
    this.router.navigate(['/add-task'])
  }
  editTask() {
    this.router.navigate(['/edit-task'])
  }

  markComplete() {

    /*
      completorEmail?: null | string;
      projectId?: string;
      taskId?: string;
    */

    //why am I using a read model here? shouldn't it be a DTO?
    const completedTaskDto: CompletedTaskDto = {
      completorEmail: this.authService.currentUser?.email ?? '',
      projectId: this.projectIds[0],
      taskId: this.tasksList[0].taskId
    }

    //taskId: rm.taskId, projectId: this.projectIds[0] 
    this.taskService.completeTask({ body: completedTaskDto})
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
