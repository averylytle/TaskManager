import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";


@Component({
  selector: 'app-already-assigned-error',
  templateUrl: './already-assigned-error.component.html',
  styleUrls: ['./already-assigned-error.component.css']
})
export class UserProjectDialogComponent {

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) { }


  close() {
    this.dialogRef.close();
  }
}


