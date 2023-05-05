import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";


@Component({
  selector: 'app-user-project-dialog',
  templateUrl: './user-project-dialog.component.html',
  styleUrls: ['./user-project-dialog.component.css']
})
export class UserProjectDialogComponent {

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) { }


  close() {
    this.dialogRef.close();
  }

}
