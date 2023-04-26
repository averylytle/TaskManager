import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-testing-dialog',
  templateUrl: './testing-dialog.component.html',
  styleUrls: ['./testing-dialog.component.css']
})
export class TestingDialogComponent implements OnInit {


  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<TestingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { description: string }) { }


  ngOnInit(): void {
   
  }

  /*save() {
    this.dialogRef.close(this.form.value ?? ''); 
  }*/

  close() {

    this.dialogRef.close()
  }
}
