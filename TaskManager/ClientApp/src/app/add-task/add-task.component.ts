import { Component, OnInit } from '@angular/core';
import { TaskService } from './../api/services/task.service';
import { IdService } from '../id/id.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
/*import { Guid } from 'guid-typescript';
import { isStringObject } from 'util/types';*/


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  public id = '';

  constructor(private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private idservice: IdService

  ) { }

  form = this.fb.group({
    id: [this.id],
    name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    description: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
    //dueDate: [new Date()],
    assignedFirstName: [''],
    assignedLastName: [''],
    priority: ['']
    })

  ngOnInit(): void {
    this.id = this.idservice.generate()
  }

  ngOnDestroy(): void {
    this.idservice.remove(this.id)
  }

  addTask() {

    if (this.form.invalid)
      return;

    console.log("Form values:", this.form.value);
    this.taskService.addTaskTask({ body: <any>this.form.value }).subscribe(console.error)
    this.router.navigate(['/tasks'])
  }

}
