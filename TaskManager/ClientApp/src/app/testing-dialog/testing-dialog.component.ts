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
    public dialogRef: MatDialogRef<TestingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string}) { }


  ngOnInit(): void {
   
  }

  close() {

    this.dialogRef.close();
  }
}
