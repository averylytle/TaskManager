import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './../api/services/task.service'
import { TasksDto, TasksRm } from '../api/models'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasksList: TasksRm[] = []

  constructor(private taskService: TaskService,
    private router: Router
  ) {  }

  /*  taskForm = this.fb.group({
  
      })*/

  ngOnInit(): void {
    this.taskService.searchTask({})
      .subscribe(response => this.tasksList = response, this.handleError)
  }

   addTask(){
    this.router.navigate(['/add-task'])
  }

  delete() {
    const dto: TasksDto = {
      taskId: this.tasksList[0].taskId
    };
    this.taskService.deleteTask({ taskId: dto.taskId })
      .subscribe(_ => this.tasksList)
    this.tasksList = this.tasksList.filter(x => !x.selected);
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
